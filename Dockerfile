FROM phusion/baseimage:0.9.17

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

# Java 8 for Google's clojure compiler
RUN \
  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  echo "deb http://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java8-installer git unzip ruby-full && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk8-installer

# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

RUN mkdir /app
RUN mkdir /app/clojure-compiler

# Clojure compiler
RUN \
  curl -O http://dl.google.com/closure-compiler/compiler-latest.zip && \
  unzip compiler-latest.zip -d /app/clojure-compiler && \
  chmod a+x /app/clojure-compiler && \
  rm compiler-latest.zip

RUN gem install bundler pry step-up --no-rdoc --no-ri

# Install Node.js
RUN curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -
RUN apt-get install --yes nodejs

RUN npm install -g grunt-cli
WORKDIR /app/jquery-mask-plugin
