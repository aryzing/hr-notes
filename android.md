# React Native on Ubuntu

# Installing

## Java

```sh
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
update-java-alternatives --list
sudo update-java-alternatives --jre --set <java8name>
```

## Android Studio

```sh
sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0 lib32stdc++ gcc-multilib -y
cd ~/Android/Sdk/tools
chmod -R 777 tools
```

# Running Android Studio

```sh
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
cd ~/Android/Sdk/tools
./emulator -avd Nexus23
```
