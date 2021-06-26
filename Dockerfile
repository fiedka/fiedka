FROM node:alpine
ENV GOPATH /usr/src/go

RUN apk update
RUN apk add bash
RUN apk add jq
RUN apk add python3
RUN apk add python3-dev
RUN apk add py3-pip
RUN apk add gcc
RUN apk add musl-dev
RUN apk add libffi-dev
RUN apk add libressl-dev
RUN apk add go
RUN apk add git
RUN apk add rust
RUN apk add cargo
RUN go get github.com/linuxboot/fiano/cmds/fmap
RUN go get github.com/linuxboot/fiano/cmds/utk
RUN pip3 install uefi_firmware
RUN pip3 install psptool
RUN pip3 install ipython

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV PATH "$PATH:$GOPATH/bin"
ENTRYPOINT [ "bash", "genfixtures.sh"]

