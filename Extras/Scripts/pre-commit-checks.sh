#!/bin/bash

# No longer used in favor of using lint-staged
# Will remove this eventually but leaving here for reference for now

LINT_CHECK_PATHS=(
    "Common/"
    "Signalling/"
    "Frontend/library/"
    "Frontend/ui-library/"
    "SignallingWebServer/"
)

FAILURE=0
FAILED_PATHS=()

for CHECK_PATH in "${LINT_CHECK_PATHS[@]}"; do
    STAGED_FILES=$(git diff --name-only --cached "$CHECK_PATH")

    # check if any of the npm packages have changes
    if [[ -n "$STAGED_FILES" ]]; then
        echo ${CHECK_PATH} has changes. Running lint...
        pushd $CHECK_PATH >/dev/null
        if ! npm run lint; then
            FAILURE=1
            FAILED_PATHS+=("$CHECK_PATH")
        fi
        popd >/dev/null
    fi
done

if [[ $FAILURE -eq 1 ]]; then
    echo Linting failures in the following paths...
    for FAILED_PATH in "${FAILED_PATHS[@]}"; do
        echo "    $FAILED_PATH"
    done
    exit 1
fi


