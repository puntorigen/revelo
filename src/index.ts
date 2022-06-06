/**
 * Revelo CLI: Text based presentations generator
 * @name 	hola
 * @module 	hola
 **/
import { cli, command } from './common/decorators'
import cmds from './cmds'
require('dotenv').config()
/**
 * cmds:
 * grow:    search and send friend requests on your behalf (aka grow your network)
 * invite:  search by the given template within your existing network those that matches, and send them a chat message inviting them to a company
 * referr:  collect those of your network who are interested, grab their english PDF resume and send it to the specified referrer (ex. austin)
 * analyze: analyze existing members of your network that match the given template (extract github,age (by pic),chat history,experience,etc.)
 * tui:     terminal user interface, to manage bots and stats
 */

@cli
export default class revelo {

    constructor(arg: { silent?: boolean } = { silent: true }) {}

    @command(`Creates a browser based presentation and starts a local web server`,[
        [   '-w',   '--public',     'If defined, gives your machine a public url'  ],
        [   '-q',   '--no-browser', `If defined doesn't self open the default browser when ready`  ],
        [   '-a',   '--autoplay',   `Hides controls and changes slides automatically, looping at the end`  ],
        [   '-t',   '--tps',        `If --autoplay, define time per slide (in seconds, default: auto)`  ],
    ],'[file]')
    async server(arg: any) {
        await (new cmds.Server(arg)).run();
    }

    @command(`Renders the presentation in the defined output file`,[
        [   '-o',   '--output', `Target output file. Supported extensions: .mp4, .gif (soon: .pdf, .zip)`  ],
        [   '-w',   '--width',  `Width (default: 1024)`  ],
        [   '-e',   '--height', `Height (default: 768)`  ],
        [   '-t',   '--tps',    `Time per slide (in seconds, default: auto)`  ],
        [   '-f',   '--fps',    `Frames per second (default: 25)`  ],
        [   '-r',   '--ratio',  `Aspect ratio (default: 4:3)`  ],
    ],'[file] [options]')
    async render(arg: any) {
        await (new cmds.Render(arg)).run();
    }

    @command(`Exports the presentation in the defined output file`,[
        [   '-o',   '--output', `Target output file. Supported extensions: .ppt (soon: .key)`  ]
    ],'[file] [options]')
    async export(arg: any) {
        await (new cmds.Export(arg)).run();
    }
}
