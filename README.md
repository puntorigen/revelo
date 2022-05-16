<img width="375" alt="logo" src="https://user-images.githubusercontent.com/57605485/167906263-89ae1d2f-29b1-4c5b-89da-e755077144c2.png"><br/>
CLI for creating rapid (& great) presentations just using the terminal!<br/><br/>

Now you can be anywhere; on any OS, on any computer, just before a meeting, even within a Github action! and create a great presentation just using a single text file!
<br/><br/>

Just create a markdown text file with your slides and it'll create for you a great presentation, which you can show it using provided server and your browser, as a PDF file or even generate it as a video!

# Run without installing it
```terminal
npx revelo [command] file [options]
```

## Summary
Generate a **cool presentation** with nothing more than NodeJS and a simple text file. The CLI includes a server with **hot browser reloading**, **public url** access thanks to ngrok and an export command which can render the presentation as a **PDF, GIF or MP4 movie**. All of this can be tracked within github version's control and executed within any termianl or within a Github workflow; this way you can include self-generating presentations within your repos!

## Commands
The CLI includes 3 commands:
- server
- export
- render

### Server Command
The server command takes the given text file (its based on markdown, but can have any extension), generates a temporal directory with the generated presentation and serves it on localhost. It supports hot reloading out of the box, so if you save any changes to the given text file, automatically refreshes the browser session with the updates.
It supports several optional parameters, being the most relevant:

**--public** 
 If you add the parameter --public, it also launches an ngrok session tunneling for public access to the presentation, giving you a public url for you to share. The tunnel lasts for about 1 hour.

**--no-browser**
By default the server command attempts to open your default web browser with the presentation. This argument, overwrites that.

_(work in progress)_


## Text File Format
See the wiki pages

## Simple example
Given the following text file:

```markdown
--- 
title: Hola bot
author: Pablo Schaffner
---
# Hola/Hello bot
->background[robot,0.2]

is a linkedin bot to find and attract talent
strategically using your likeminded peers

---
steps we are going to see:
->background-color[blue]
->wait[2000]
:::{incremental}
- how we create people networks
- what is this tool about & what does it do
- how to use the tool
- demo :-)
- QA
::: 

---
# How are people's networks created ?
->background[happy people,0.5]
->transition[zoom]
- people like to be part of similar interests
- people like to be show they share similar interests
- people like to be proud of who they have on their networks
- people become 'friends' of their goals
```

Generates the following presentation<br/>

_.. work in progress .._