Vagrant.configure("2") do |config|

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/xenial64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  config.vm.network "public_network"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  config.vm.network :forwarded_port, guest: 8080, host: 8080, host_ip:"127.0.0.1"
  config.vm.network :forwarded_port, guest: 27017, host: 27017, host_ip:"127.0.0.1"
  config.vm.network :forwarded_port, guest: 3306, host: 3306, host_ip:"127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    
    sudo apt-get update

    sudo apt-get install curl

    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install -y build-essential

    #install mongodb
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org

    # to run mongodb see https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
    # sudo service mongod start
    # to verify if mongodb is running
    # nano ../../var/log/mongodb/mongodb.log

    #install mysql
    sudo apt-get update -q
    debconf-set-selections <<< "mysql-server mysql-server/root_password password 123qwe"
    debconf-set-selections <<< "mysql-server mysql-server/root_password_again password 123qwe"
    sudo apt-get install -y --allow-unauthenticated mysql-server
    sudo service mysql restart
    # mysql -u root -p123qwe -h localhost -e "CREATE DATABASE IF NOT EXISTS node;CREATE DATABASE IF NOT EXISTS test;CREATE USER IF NOT EXISTS 'api'@'localhost' IDENTIFIED BY '123qwe';GRANT ALL PRIVILEGES ON node.* TO 'api'@'localhost';GRANT ALL PRIVILEGES ON test.* TO 'api'@'localhost'; FLUSH PRIVILEGES;"
    # mysql -u root -p123qwe -h localhost node < ../../vagrant/db_dump.sql
    
    # to get in mysql terminal
    # mysql -u root -p123qwe test

    # if: protocol error, symlink '../semver/bin/semver' -> '/vagrant/node_modules/.bin/semver'
    # sudo npm install --save --no-bin-links


  SHELL
end
