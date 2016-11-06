#!/bin/bash

number=5
read -p "Guess a number b/w 1 and 10: " guess
while [[ ! $guess == $number ]]; do
  if [[ -z $guess ]]; then
    read -p "You must specify a value! " guess
  elif [[ $guess =~ [^0-9] ]]; then
    read -p "Please specify a valid number " guess
  else
    read -p "Not this time, try again! " guess
  fi
done

echo "You got it!"
