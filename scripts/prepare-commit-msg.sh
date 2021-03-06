#!/bin/bash
# Script taken from:
# https://stackoverflow.com/questions/5894946/how-to-add-gits-branch-name-to-the-commit-message
# and modified for use with husky.
branchPath=$(git symbolic-ref -q HEAD) #Somthing like refs/heads/myBranchName
branchName=${branchPath##*/}      #Get text behind the last / of the branch path
firstLine=$(head -n1 $HUSKY_GIT_PARAMS)
if [ -z "$firstLine"  ] ;then #Check that this is not an amend by checking that the first line is empty
    echo "Entre en sed"
    sed -i "1s/^/($branchName): \n/" $HUSKY_GIT_PARAMS  #Insert branch name at the start of the commit message file
fi

