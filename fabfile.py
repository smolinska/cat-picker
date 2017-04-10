from fabric.api import task
from fabric.colors import green, white
from fabric.context_managers import cd
from fabric.operations import require, run, local, sudo
from fabric.state import env
from fabconfig import prod, notify


@task
def restart():
    require('hosts')
    notify("Restarting application")
    with cd(env.code_dir):
        run("bin/supervisorctl restart all")


@task
def update_code():
    require('hosts')
    notify("Updating code")
    with cd(env.code_dir):
        run('git pull')


@task
def build():
    require('hosts')
    notify("Gulp")
    with cd(env.code_dir):
        run('yarn install')
        run('bower install')
        run('gulp build')
        run('ln -s src/lib {}/lib --force'.format(env.dist_dir))
        run('ln -s src/img {}/img --force'.format(env.dist_dir))
        sudo('chgrp www-data -R ./' + env.dist_dir)

@task
def deploy():
    require('hosts')
    update_code()
    build()

@task
def first_deploy():
    require('hosts')
    notify("Initial")
    run('mkdir -p ' + env.code_dir)
    with cd(env.code_dir):
        run('git clone ' + env.repo + ' .')
    deploy()
    