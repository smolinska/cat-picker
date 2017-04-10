from fabric.colors import green
from fabric.decorators import task
from fabric.state import env
from fabric.operations import local


def notify(msg, color=green):
    bar = '+' + '-' * (len(msg) + 2) + '+'
    print color('')
    print color(bar)
    print color("| %s |" % msg)
    print color(bar)


@task
def prod():
    """Setup env"""
    env.hosts = ['alpakara.pl']
    env.user = 'alex'
    env.port = 21022
    env.project = 'cat-picker'
    env.env = "prod"
    env.code_dir = '/var/www/smolinska/' + env.project
    env.repo = local('git config --get remote.origin.url', capture=True)
    env.dist_dir = 'build'
