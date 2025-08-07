#!/usr/bin/zsh

cd _posts/

filename=`date +%Y-%m-%d-new-post.md`

cat > $filename <<EOF
---
layout: default
title:
description:
categories: [""]
date: `date "+%Y-%m-%d %H:%M:%S"`
---
EOF
