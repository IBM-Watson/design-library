# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'

# Set synced_folder_type to 'smb' only if Windows:
synced_folder_type = 'nfs'
require 'rbconfig'
if (RbConfig::CONFIG['host_os'] =~ /mswin|msys|mingw|cygwin|bccwin|wince|emc/)
  synced_folder_type = 'smb'
end

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = 'IBM-Watson/front-end'

  # Copy host gitconfig into the Virtual Machine
  # On Windows if not using Powershell, change `~/.gitconfig` to `C:\Users\$USER` with $USER being your user name
  config.vm.provision 'file', source: '~/.gitconfig', destination: '.gitconfig'
  config.vm.provision 'shell', path: '.standup.sh'
  config.vm.provision 'shell', path: '.stackup.sh', privileged: false

  # Set the shell for SSH to be an interactive ZSH session
  config.ssh.shell = '/bin/zsh -i'

  # Set up Vagrant folder to be NFS and provide it a private network
  config.vm.synced_folder '.', '/vagrant', disabled: true
  config.vm.synced_folder 'patterns', '/crick/patterns',
      type: synced_folder_type,
      mount_options: ['rw', 'vers=3', 'tcp', 'actimeo=1']
  config.vm.synced_folder 'library', '/crick/library',
      type: synced_folder_type,
      mount_options: ['rw', 'vers=3', 'tcp', 'actimeo=1']
  config.vm.synced_folder 'language', '/crick/language',
      type: synced_folder_type,
      mount_options: ['rw', 'vers=3', 'tcp', 'actimeo=1']
  config.vm.synced_folder 'bower_components', '/crick/bower_components',
      type: synced_folder_type,
      mount_options: ['rw', 'vers=3', 'tcp', 'actimeo=1']
  config.vm.synced_folder '.www', '/crick/www',
      type: synced_folder_type,
      mount_options: ['rw', 'vers=3', 'tcp', 'actimeo=1']

  # Set up network
  config.vm.network 'forwarded_port', guest: 3000, host: 3000
  config.vm.network :private_network, ip: '172.10.10.10'

  # Play with Provider Goodies
  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 2
  end
end
