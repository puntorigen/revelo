import Command from '../common/command'
//import Helper from '../common/helper'
import Presentation from '../common/presentation'

const fs = require('fs').promises;
const path = require('path');
const emoji = require('node-emoji');
//const helper = new Helper();
const promisify = require('util').promisify;
const sleep = ms => new Promise(r => setTimeout(r, ms));
let sourceFile = '', tmpdir = '';

//generates a Render file (PDF,MP4,GIF) from the given text presentation
export default class Render extends Command {
    presentation: any
    spinner: any
    targetFile: string
    targetFormat: string

    async init() {
        //@todo read this values from a theme.json file
        this.setColorTokens({
            '*':'yellow',
            '#':'cyan',
            '@':'green',
            '|':'brightRed'
        });
        let file = '';
        try {        
            if (this.arg._.length==0) file = await this.ask(`Please enter the filename with the presentation:`);
            if (this.arg._.length>0) file = this.arg._.shift();
            sourceFile = path.join(process.cwd(),file);
        } catch(errLoad) {
            sourceFile = '';
        }
        if (this.arg.output && this.arg.output!='') {
            this.targetFile = path.join(process.cwd(),this.arg.output);
            this.targetFormat = this.arg.output.split('.').pop().toLowerCase().trim();
        }
        if (!this.arg.fps) this.arg.fps = 10;   //default fps
        if (!this.arg.tps) this.arg.tps = 'auto';   //default tps (10 secs)
        if (file=='' || sourceFile=='') {
            this.x_console.out({ message:`|Error! No file given! Bye bye!|` });
            await this.finish(304);
        }
        if (!['mp4','gif'].includes(this.targetFormat)) {
            this.log(`Error: the given output file extension (*.${this.targetFormat}*) is not currently supported (only: @.mp4@)`);
            return false;
        }
        this.presentation = new Presentation(sourceFile);
        this.spinner = this.x_console.spinner();
        try {
            await fs.stat(sourceFile)
            const dir = promisify(require('tmp').dir);
            tmpdir = await dir();
            //detect abort process by user
            process.on('SIGINT', async()=>{
                this.spinner.start('|EXIT detected|! Cleaning tmp files ..');
                //clean tmpdir
                await fs.rm(tmpdir, { recursive:true });
                this.spinner.succeed(`|exit ready!|, @have a nice day!@ ${emoji.get('smile')}`);
                //exit
                this.finish(10);
            });
            //console.log('tmpdir',tmpdir); 
            return true;
        } catch {
            this.log(`Error: the given file doesn't exist`);
            return false;
        }
    }

    async createReveal() {
        this.spinner.start('preparing presentation ..');
        const reveal = await this.presentation.baseReveal(tmpdir);
        //console.log(reveal); //@todo remove
        this.spinner.text('generating presentation');
        let options_:any = { hideInactiveCursor:true, pdfSeparateFragments:false };
        try {
            options_ = {...options_,
                        ...{ 
                            video:true, 
                            autoSlide: true, 
                            progress: false,
                            controls: false,
                            loop: false,
                            downloadAssets: tmpdir, 
                            fps:this.arg.fps,
                            tps:this.arg.tps,
                        }};
            let presentation_ = await this.presentation.createPresentation('',reveal.presentation,options_,this.spinner);
            /*
            this.presentation.on('convertToWebm:finish',(progress)=>{
                this.spinner.text(`converting video ${progress.percent}%`);
            });*/
            if (presentation_.warnings.length>0) {
                this.spinner.warn('presentation generated with warnings:');
                presentation_.forEach((item)=>{
                    this.x_console.out({ color:'yellow', message:`${item.type}: ${item.text}` });
                });
            } else {
                this.spinner.succeed('presentation ready');
                //this.debug('presentation debug',presentation_.meta);
            }
            return { reveal, meta:presentation_.meta};
        } catch(errPres) {
            this.spinner.fail('presentation generation failed');
            console.log(errPres);
            return { reveal };
        }
    }

    async recordBrowser(url,time) {
        const puppeteer = require('puppeteer');
        //const codecs = require( 'chromium-all-codecs-bin' )()
        const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
        const minimal_args = [
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-extensions',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-speech-api',
        '--disable-sync',
        '--hide-scrollbars',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--use-gl=egl', //swiftshader
        '--use-mock-keychain',
        ];
        const browser = await puppeteer.launch({
            args:minimal_args, 
            headless:true, 
            //executablePath:codecs
        });
        //const browser = await puppeteer.launch({ headless:true, executablePath:codecs });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36');
        const recorder = new PuppeteerScreenRecorder(page, {
            fps: this.arg.fps,
            videoFrame: {
                width: this.arg.width?this.arg.width:800,
                height: this.arg.height?this.arg.height:600,
            },
            aspectRatio: this.arg.ratio?this.arg.ratio:'16:9',
        });
        await sleep(50);
        await page.goto(url, {
            waitUntil: 'networkidle2'
        });
        await recorder.start(this.targetFile);
        /*page.on('console', async msg=> {
            this.debug('PAGE LOG:', {type:msg._type, text:msg._text }); // get console messages (@todo to check when video ends)
        });*/
        //idea2: goto next slide every x secs
        page.bringToFront();
        await sleep(time); //wait presentation duration
        //end video recording
        await recorder.stop();
        await browser.close();
        //kill browser session
        const treekill = require('tree-kill');
        treekill(browser.process().pid, 'SIGKILL');
        //await page.waitForTimeout(10000);
        //await sleep(20000); //test, record 10 seconds
    }

    async convertToGif(mp4,output) {
        let ffmpeg = require('fluent-ffmpeg');
        const asPromise = ()=>new Promise((resolve,reject)=>{
            ffmpeg(mp4) .outputOption("-filter_complex", `fps=${this.arg.fps},scale=${this.arg.width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=bayer`)
                        .on('error', function(err,stdout,stderr) {
                            reject(err);
                        }).on('progress', function(progress) {
                            //console.log(`${progress.percent}% done`);
                        }).on('end', function(err,stdout,stderr) {
                            resolve(stdout);
                        }).save(output);
        });
        const down:any = await asPromise();
        return down;
    }

    async process() {
        if (this.targetFormat=='mp4' || this.targetFormat=='gif') {
            if (this.targetFormat=='gif') {
                this.arg.fps = (this.arg.fps)?Math.max(this.arg.fps,5):5;
                this.arg.width = this.arg.width?this.arg.width:400;
                this.arg.height = this.arg.height?this.arg.height:300;
                this.targetFile = this.targetFile.replaceAll('.gif','.mp4');
            }
            //generate presentation (@todo add console.logs to reveal code to capture start/end using puppeteer)
            const reveal_ = await this.createReveal();
            const reveal = reveal_.reveal;
            //start local server
            this.spinner.start('preparing local server ..');
            let express = require('express'), app = express();
            app.use(express['static'](reveal.path));
            app.use(express['static'](path.dirname(sourceFile))); //add md file within / public path as well (for assets)
            app.listen(3000);
            this.spinner.succeed('local server ready');
            //record browser session
            let time = (reveal_.meta && reveal_.meta.totalTime)?reveal_.meta.totalTime:10000;
            let kword = 'video';
            if (this.targetFormat=='gif') kword = 'animation';
            this.spinner.start(`generating ${Math.round(time/1000)} secs ${kword} ..`);
            await this.recordBrowser('http://127.0.0.1:3000',time);
            this.spinner.succeed(`generated ${Math.round(time/1000)} secs ${kword}`);
            //convert mp4 into gif if necessary
            if (this.targetFormat=='gif') {
                this.spinner.start(`creating gif animation ..`);
                const targetGIF = this.targetFile.replaceAll('.mp4','.gif');
                let gif_ = await this.convertToGif(this.targetFile,targetGIF);
                this.spinner.text(`optimizing gif ..`);
                const resize = require('@gumlet/gif-resize');
                const buf = await fs.readFile(targetGIF);
                const data = await resize({ optimizationLevel:3, interlaced:true })(buf);
                //overwrite compressed gif
                await fs.writeFile(targetGIF,data);
                //erase original mp4 file
                await fs.unlink(this.targetFile);
                //
                this.spinner.succeed(`gif ready!`);
            }
            //clean & exit
            this.spinner.start('|Finished|! Cleaning tmp files ..');
            await fs.rm(tmpdir, { recursive:true });
            this.spinner.succeed(`|ready!|, @have a nice day!@ ${emoji.get('smile')}`);
            //show meta table
            if (reveal_.meta) {
                console.log('\n');
                this.x_console.table({
                    title:'Meta info',
                    color:'green',
                    data:reveal_.meta.slides.map((item,idx)=>({
                        slide:idx+1,
                        secs:(item.time.time/1000).toFixed(1),
                        pictures:item.pictures,
                        videos:item.videos,
                    }))
                });
            }
            this.finish(10);
        }
        //
    }

}