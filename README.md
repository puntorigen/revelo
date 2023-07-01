<center>
<h1>A New Way to Create Dynamic Presentations from the Terminal</h1>
<img width="375" alt="logo" src="https://user-images.githubusercontent.com/57605485/167906263-89ae1d2f-29b1-4c5b-89da-e755077144c2.png"/>
</center>

Revelo is a powerful Command Line Interface (CLI) tool designed to rapidly generate striking presentations and videos using just your terminal. It's easy to use and works seamlessly across different operating systems. So, whether you're getting ready for a meeting or working remotely, Revelo allows you to create and deliver engaging presentations on the go.<br/><br/>

Using just a simple text file, Revelo can generate a server-based presentation with your slides, or export your presentation as a PDF, GIF, or MP4 movie. Thanks to its robust version control system, every change you make can be tracked within Github. What's more, it also supports Github workflows allowing you to include self-generating presentations within your repositories.<br/><br/>

# Installation-Free Usage
Run Revelo without even installing it:
```terminal
npx revelo [command] file [options]
```

## Key Features
1. **Server-Based Presentations**: Revelo's server command generates a temporary directory with your presentation and serves it on localhost. This comes with hot reloading support, allowing any changes to your text file to automatically refresh the browser session with the updates.
2. **Public URL Access**: Revelo uses localtunnel to provide public URL access to your presentations, which you can easily share.
3. **Multiple Export Options**: Export your presentation as a PDF, GIF, or MP4 movie using Revelo's export command.
4. **Github Integration**: Revelo supports Github workflows, allowing you to generate presentations within your repositories.


## CLI Commands
Revelo comes with three main commands:
1. **Server**: This command generates a temporary directory with your presentation and serves it on localhost.
2. **Render**: This command generates an MP4 movie or GIF animation of your presentation.
3. **Export**: This command exports your presentation as a PDF, GIF, or MP4 movie.

### Server Command
The server command generates a presentation from the provided text file and serves it on localhost. It supports hot reloading and offers several optional parameters:

**--public**<br/> 
Enables a localtunnel session for public access to the presentation. (Please note that hot reloading is currently disabled when this feature is used)

**--no-browser**<br/>
Prevents the server command from opening your default web browser with the presentation.

**--autoplay**<br/>
Removes progress bar, slider controls and automatically progresses to the next slide by the defined time.

### Render Command
The render command generates an MP4 movie or GIF animation of your presentation. It supports several optional parameters:

**--output**<br/>
Defines the target MP4/GIF file name and location.

**--fps**<br/>
Defines the frames per second (defaults to 25 for MP4, 5 for GIF).

**--tps**<br/>
Defines the time per slide in seconds (defaults to 'auto' which uses a time-to-read algorithm to determine the best waiting time per slide).

## Text File Format
Please see the wiki pages (currently in progress)

## Example
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

Running the following command:

```bash
npx revelo render example/hello.txt -o hello.gif
```

Generates the following presentation:<br/>
![hello](https://user-images.githubusercontent.com/57605485/172454198-973fc649-b6fd-483e-92dc-0d37fef0523d.gif)



