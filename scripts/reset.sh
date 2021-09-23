#!/bin/bash
# reset.sh
# Author: Alexander Burdiss
# Since: 9/22/21
# Version: 1.0.0
# Description: Performs a hard reset of the project.

GREEN="\033[01;32m"
BLUE="\033[01;36m"
RED="\033[01;31m"
YELLOW="\033[01;33m"
NC="\033[00m"

echo
echo -e "      ${GREEN}██████╗ ██████╗  █████╗ ███████╗███████╗${BLUE}██╗  ██╗${NC}"
echo -e "      ${GREEN}██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝${BLUE}╚██╗██╔╝${NC}"
echo -e "      ${GREEN}██████╔╝██████╔╝███████║███████╗███████╗${BLUE} ╚███╔╝ ${NC}"
echo -e "      ${GREEN}██╔══██╗██╔══██╗██╔══██║╚════██║╚════██║${BLUE} ██╔██╗ ${NC}"
echo -e "      ${GREEN}██████╔╝██║  ██║██║  ██║███████║███████║${BLUE}██╔╝ ██╗${NC}"
echo -e "      ${GREEN}╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝${BLUE}╚═╝  ╚═╝${NC}"
echo "                           reset.sh"
echo

# Make sure script is being run in the correct directory
currentPath=${PWD##*/} 
if [[ ! $currentPath -eq 'BrassExcerpts' ]]; then
  echo -e "${RED}This script must be run from the root directory of BrassXcerpts!${NC}"
  exit 1;
fi

# Make sure the right dependencies are installed
if ! command -v gtimeout &> /dev/null; then
    echo -e "${RED}coreutils module not installed${NC}"
    echo "Please install coreutils with \`brew install coreutils\` before continuing"
    exit 1
fi


# Remove DerivedData from Xcode
echo -e "${BLUE}Would you like to remove ~/Library/Developer/Xcode/DerivedData (y/N)?${NC}"
read derivedRemove
if [[ $derivedRemove == "y" ]] || [[ $derivedRemove == "Y" ]]; then
  rm -rf ~/Library/Developer/Xcode/DerivedData
  echo -e "${GREEN}Removed ~/Library/Developer/Xcode/DerivedData${NC}"
else
  echo -e "${YELLOW}Not removing ~/Library/Developer/Xcode/DerivedData${NC}"
fi

###########################
##        node.js        ##
###########################
# Remove package-lock.json
echo -e "${BLUE}Would you like to remove package-lock.json (y/N)?${NC}"
read packageLock
if [[ $packageLock == "y" ]] || [[ $packageLock == "Y" ]]; then
  rm package-lock.json
  echo -e "${GREEN}Removed package-lock.json${NC}"
else
  echo -e "${YELLOW}Not removing package-lock.json${NC}"
fi

# Remove node_modules
echo "Removing node_modules"
rm -r node_modules
echo -e "${GREEN}Removed node_modules${NC}"

# Install node_modules
echo "Installing node_modules"
npm install
npmInstalled=$?
if [[ $npmInstalled -eq 0 ]]; then
  echo -e "${GREEN}Installed node_modules${NC}"
else
  echo -e "${RED}Failed to install node_modules${NC}"
  echo "This is likely due to an issue with legacy peer dependencies"
  echo -e "${BLUE}Would you like to try again with --legacy-peer-deps (y/N)?${NC}"
  read legacyNpm
  if [[ $legacyNpm == "y" ]] || [[ $legacyNpm == "Y" ]]; then
    echo "Installing node modules with --legacy-peer-deps"
    npm install --legacy-peer-deps
    legacyInstalled=$?
    if [[ $legacyInstalled -eq 0 ]]; then
      echo -e "${GREEN}Installed node_modules with --legacy-peer-deps${NC}"
    else
      echo -e "${RED}Failed to install node_modules with --legacy-peer-deps${NC}"
      exit 1
    fi
  else
    echo -e "${RED}Exiting script${NC}"
    exit 1
  fi
fi

###########################
##          iOS          ##
###########################
arch=`uname -m`
cd ios

# Clean the Xcode build folder
echo "Cleaning Xcode build folder"
xcodebuild clean
echo -e "${GREEN}Xcode build folder cleaned${NC}"

# Remove Pods
echo "Removing Pods"
rm -rf Pods
echo -e "${GREEN}Removed Pods${NC}"

# Install Pods
echo "Installing Pods"
if [[ ! ${arch} == 'arm64' ]]; then
  # M1 Mac
  arch -x86_64 pod install
else
  # Intel Mac
  pod install
fi
echo -e "${GREEN}Installed Pods${NC}"

cd ..

###########################
##        Android        ##
###########################
cd android

# Clean Gradle Build
echo "Cleaning gradle build"
./gradlew clean
echo -e "${GREEN}Cleaned gradle build"

cd ..

# Reset react native cache
echo "Resetting react native cache"
gtimeout 3 npm start -- --reset-cache
echo -e "${GREEN}Reset react native cache${NC}"

echo
echo -e "${GREEN}** BrassX has been reset! **${NC}"
echo
exit 0
