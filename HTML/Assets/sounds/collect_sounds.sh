#!/bin/bash

doit(){
	for file in ./prompts/*
	do
	    if [[ -f $file ]]; then
	        echo $file
	    fi
	done

	for file in ./letters/*
	do
	    if [[ -f $file ]]; then
	        echo $file
	    fi
	done

	for file in ./words/*
	do
	    if [[ -f $file ]]; then
	        echo $file 
	    fi
	done
} &> soundslist

doit;
