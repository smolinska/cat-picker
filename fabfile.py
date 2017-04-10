from fabric.api import task
from fabric.colors import green, white
from fabric.context_managers import cd
from fabric.operations import require, run, local
from fabric.state import env


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
        run('ln -s src/lib build/lib')
        run('ln -s src/img build/img')

@task
def deploy():
    require('hosts')
    run('mkdir -p ' + env.code_dir)
    update_code()
    build()
    