---
title: 'Automate tasks: Fedora essential softwares installation'
author: Yuri
date: 2021-02-25
category: Development
image: ../images/fedora-essential-softwares-installation.jpg
credits: Photo by <a href="https://unsplash.com/@_imkiran?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Sai Kiran Anagani</a> on <a href="https://unsplash.com/s/photos/linux?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
---

Whenever I think of making a clean install, either to format an HDD or make a dual boot, I end up being kind of sad due to the fact I’ll have, for sure, the burden of installing all me softwares and packages again in order to keep my routine. Moreover, there are some cases that I can do this when I want (e.g. I just want to switch from Ubuntu to Fedora to take a breath of fresh air) and cases which I must do ASAP in order to keep working (e.g. a corrupted filesystem, a kernel problem, a hardware issue, etc.).

I was used to spent hours in that process: get an ISO file of my favorite OS, create a bootable version in an USB stick (which I had sought for a while), install it, remember all the softwares I use in my day by day, go to each documentation or check the official repo to download, install and then, finally, configure what is necessary individually. Let's be honest here, that’s an extremely boring and lengthy process.

I usually don’t do it so frequently, I’d say once in three years on average. But, anyway, it’s stressful especially when you do have deadlines getting closer and closer and your workstation is not ready.

## Automating the installation
In my opinion, one of the coolest things about being a developer is the capacity of automating boring stuff. And that’s cool because we can be creative and there’s a lot of different possibilities to explore.

In the case of a fresh install, we can automate the softwares installation writing a simple (but very handful) script that we can run every time we make a clean install of Fedora or any other OS you like, in this case you just have to adapt the script to it.

My idea was checking out in my current Fedora install all the essentials (some of them aren’t indeed) softwares and packages that I use for work or leisure. After getting this list, I went to check all the official docs to see the installation processes and wrote a bash script containing command line way of installing all of them.

For example, snap is a very useful tool to handle some softwares, and its installation in made by doing:

<code-highlight language="bash">
#!/bin/bash
sudo dnf install -y snapd && \
sudo ln -s /var/lib/snapd/snap /snap && \
snap --version
</code-highlight>

This commands above will install [snapd](https://snapcraft.io/docs/installing-snapd), that provides containerised packages for Linux-based kernels. Snap was created by [Canonical](www.canonical.com) in 2014 and makes the installation, update and software running easy. Snap will be used to install some of the softwares in the script I'm bringing today.

The complete file can be found [here](https://github.com/yuricd/fedora-essential-install/blob/master/install.bash) and the list of softwares being installed can be found [here](https://github.com/yuricd/fedora-essential-install). 


## Testing
Since I was doing it in a configured and running workstation, it will not reproduce accurately a fresh install with an “empty” environment. To be more realistic, I set-up a docker image and a container that runs the script in the latest Fedora version (33 at the moment I write it).

The Dockerfile is the following:

<code-highlight language="dockerfile">
FROM fedora:latest
COPY install.bash /tmp/
</code-highlight>

As you can see, the image is using the latest Fedora version and copying the `install.bash` script to `/tmp` inside the container we will run next. 

To save some time, I also wrote the `docker run` command in a file to make it easier to test: 

<code-highlight language="shell">
#!/bin/bash
docker build -t fedora_bp_installer:latest .
docker run -i -t --rm -p 5902:5902 --name fedora_test fedora_bp_installer
</code-highlight>

The script above will just run the image we generated in line #2 in a new container binding the port 5902 of the container to the same port in the host. When container is up, it will prompt the terminal of our simulated environment. When we leave the container terminal, it will be stopped and removed automatically because of the flag `--rm`. Now, just execute the copied script:

<code-highlight language="shell" showLines="false">
[root@73d0030994af /] chmod +x /tmp/install.bash && ./tmp/install.bash 
</code-highlight>

Don't forget to give the execution permission to the file.

## Configuration
It is still necessary to configure the recently installed softwares. For example, in DBeaver you’ll still have to connect to the databases (in my case I usually run them via Docker or cloud); in VSCode you’ll probably have to clone your repos to be ready to go; in AWS CLI you’ll need to set your credentials file to be authorized to perform operation. All of these tasks you can also be automated, but, of course, it will require a little more care since you need to put in command line some tokens, secret keys, usernames, passwords, etc. In other words, you’ll have some work to do before getting the job done and going back to routine, but now we are free of the burden of reinstalling everything from scratch and we are just going to spend some time installing the OS and setting up the softwares.

## Improvements
There are two points that I find awesome to add to this script:
 - Check the current version of the OS - 32/64 bits. Currently everything is running for a 64-bit version.
 - Log the install errors in a grouped way to make it easier to fix in case of problems.
 - Make it easier to customize. The current set of softwares is based on my routine, but you may want to add or remove some of them. One possibility is to isolate the installing process of each software in a file and use them by demand in a main script.

 I didn't have to execute this script by need yet, I'm just antecipating some major bother. So, if you identify some broken thing or want to contribute, feel free to send in the [repo](https://github.com/yuricd/fedora-essential-install). 

Cheers!
