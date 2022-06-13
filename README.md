<img width="375" alt="logo" src="https://user-images.githubusercontent.com/57605485/167906263-89ae1d2f-29b1-4c5b-89da-e755077144c2.png"><br/>
CLI for creating rapid (& great) presentations just using the terminal!<br/>

Now you can be anywhere and deliver great looking presentations! on any OS, on any computer, just before a meeting, and using a simple text file! From there it'll generate a server based presentation with your slides, a PDF or even a movie!<br/><br/>

# Run without installing it
```terminal
npx revelo [command] file [options]
```

## Summary
Generate a **cool presentation** with nothing more than NodeJS and a simple text file. The CLI includes a server with **hot browser reloading support**, **public url access** thanks to localtunnel and an export command which can render the presentation as a **PDF, GIF or MP4 movie**. All of this can be tracked within github version's control and executed within any terminal or within a **Github workflow**; this way you can even include self-generating presentations within your repos!

## Commands
The CLI includes 3 commands:
- server
- render
- export

### Server Command
The server command takes the given text file (its based on markdown, but can have any extension), generates a temporal directory with the generated presentation and serves it on localhost. It supports hot reloading out of the box, so if you save any changes to the given text file, automatically refreshes the browser session with the updates.
It supports several optional parameters, being the most relevant:

**--public**<br/> 
 If you add the parameter --public, it also launches an localtunnel session tunneling for public access to the presentation, giving you a public url for you to share. If used, currently the hot-reloading feature gets disabled.

**--no-browser**<br/>
By default the server command attempts to open your default web browser with the presentation. This argument overwrites that.

**--autoplay**<br/>
Removes progress bar, slider controls and automatically goes to next slide by the time defined; works almost as a movie but for the browser.

### Render Command
The render command takes the given text file and generates an MP4 movie or GIF animation of the generated presentation on the --output file defined. Works almost as the --autoplay server argument, but saves the result as a movie/animation. It supports several optional parameters, being the most relevant:

**--output**<br/>
Defines the target MP4/GIF file name and location.

**--fps**<br/>
Defines the frames per second. Default 25 for MP4, 5 for GIF

**--tps**<br/>
Defines the time per slide in seconds. Defaults to 'auto' which uses a time to read algo to determine the best time to wait per slide.

## Text File Format
See the wiki pages (in progress)

## Simple example
Given the following text file (example/hello.txt):

```markdown
# Hello
this is the first slide
->background-color[green]
->background[forrest,0.6]

---
# another
->background-color[blue]
->wait[1500]
:::{incremental}
- this is another slide
- with some bullets
- and steps
- and emoji's ;-)
::: 

---
## This is the third
->background-color[white]
->background-video[ocean,0.3]
->transition[zoom]
it supports video backgrounds

---

## This is the fourth
->wait[6000]
->background-color[white]
->background[happy people,0.3]
- you can have different <(.blue)> 
- colours per line <(.green)> 

---

## The end now
->wait[10000]
->background-color[black]
->background[nature,0.8]
```

Generates the following presentation<br/>
![hello](https://user-images.githubusercontent.com/57605485/172454198-973fc649-b6fd-483e-92dc-0d37fef0523d.gif)


Using the following command:


```bash
npx revelo render example/hello.txt -o hello.gif
```



```mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
  
```
