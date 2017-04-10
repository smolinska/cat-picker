from fabric.colors import green
from fabric.decorators import task
from fabric.state import env


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
    env.project = 'cat-picker'
    env.env = "prod"
    env.code_dir = '/var/www/smolinska/' + env.project
