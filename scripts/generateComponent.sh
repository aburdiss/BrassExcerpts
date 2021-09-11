#!/bin/bash
# generateComponent.sh
# Author: Alexander Burdiss
# Since: 9/7/21
# Version: 1.0.0
# Description: Generates a React component and all the necessary files that go
# along with it.

path=$1
component=$2
date=`date +"%D"`

GREEN="\033[01;32m"
BLUE="\033[01;36m"
RED="\033[01;31m"
YELLOW="\033[01;33m"
NC="\033[00m"

echo
echo -e "${GREEN}██████╗ ██████╗  █████╗ ███████╗███████╗${BLUE}██╗  ██╗${NC}"
echo -e "${GREEN}██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝${BLUE}╚██╗██╔╝${NC}"
echo -e "${GREEN}██████╔╝██████╔╝███████║███████╗███████╗${BLUE} ╚███╔╝ ${NC}"
echo -e "${GREEN}██╔══██╗██╔══██╗██╔══██║╚════██║╚════██║${BLUE} ██╔██╗ ${NC}"
echo -e "${GREEN}██████╔╝██║  ██║██║  ██║███████║███████║${BLUE}██╔╝ ██╗${NC}"
echo -e "${GREEN}╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝${BLUE}╚═╝  ╚═╝${NC}"
echo "              generateComponent.sh"
echo

if [[ $# -eq 0 || $# -eq 1 ]]; then
  echo
  echo -e "${RED}You must specify a directory and a component.${NC}"
  echo
  exit 1
fi

if [[ ! -d "src/$path" ]]; then
  echo
  echo -e "${RED}Directory src/$path Doesn't exist!${NC}"
  echo
  exit 1
elif [[ -d "src/$path/$component" ]]; then
  echo
  echo -e "${RED}Component src/$path/$component Already exists!${NC}"
  echo
  exit 1
fi

mkdir "src/$path/$component"

# Make JS File
echo "import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

/**
 * @namespace $component
 * @function $component
 * @author Alexander Burdiss
 * @since $date
 * @version 1.0.0
 * @component
 */
export default function $component() {
  return (
    <View style={styles.container}>
      <Text>$component Works!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});" > "src/$path/$component/$component.js"

# Make Jest test file
echo "import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import $component from './$component';

describe('renders $component', () => {
  test('renders base component', () => {
    render(<$component />);
  });
});" > "src/$path/$component/$component.test.js"

echo
echo -e "${GREEN}Component ${YELLOW}src/$path/$component ${GREEN}Created Successfully!${NC}"
echo
exit 0
