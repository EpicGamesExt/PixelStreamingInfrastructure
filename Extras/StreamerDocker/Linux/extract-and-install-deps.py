#!/usr/bin/env bash
from pathlib import Path
import re, subprocess, sys

# Executes a command and verifies that it succeeds
def run(command):
	print(command, file=sys.stderr, flush=True)
	return subprocess.run(command, check=True)


# Read the contents of the Mesa dependencies shell script
depsScript = Path(sys.argv[1]).read_text('utf-8')

# Identify the required version of the LLVM toolchain
llvmVersion = re.search('LLVM_VERSION:=([0-9]+)', depsScript).group(1)

# Extract the list of apt packages that need to be installed
aptPackages = re.search('\DEPS=\(\n(.+?)\n\)\n\n', depsScript, re.DOTALL | re.MULTILINE).group(1)
aptPackages = aptPackages.replace('\\', '')
aptPackages = aptPackages.replace('\"', '')
aptPackages = aptPackages.replace('${LLVM_VERSION}',llvmVersion)
aptPackages = [p.strip() for p in aptPackages.splitlines() if len(p.strip()) > 0]

# Append any required packages that are missing from the list
PACKAGES = [
	'libdrm-dev',
	'libudev-dev',
	'libwayland-egl-backend-dev',
	'libxcb-dri2-0-dev',
	'libxcb-dri3-dev',
	'libxcb-glx0-dev',
	'libxcb-present-dev',
	'llvm-{}-dev'.format(llvmVersion),
	'meson'
]
for package in PACKAGES:
	if package not in aptPackages:
		aptPackages.append(package)

run(['pip3', 'install', 'meson==1.4.0'])

# Install the apt packages (this will include the LLVM toolchain)
run(['apt-get', 'install', '-y', '--no-install-recommends'] + aptPackages)
