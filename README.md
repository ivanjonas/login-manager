# Login Manager

A little utility to be used with Greasemonkey or Tampermonkey to inject a password manager into any web page. 

## Security

This thing isn't secure. It stores plaintext usernames and passwords in localstorage. 

### Why use it then?

It exists to be used on unimportant sites for convenience's sake. The original use case is for developers and QA folks to be able to quickly and easily log in to an application **in dev/qa environments** with various testing accounts. For example, a user may want to be able to test with the following four accounts and their passwords:

|Username|Password|
|--------|--------|
|bob11-19|testtest|
|bob12-03|testtest|
|bob12-05|testtest|
|max09-02|mypassword|

Typing the numbers is annoying, and those passwords are probably widely used and known by others anyway. This utility lets you log in with those accounts with a single click.

| :exclamation: It is this _highly insecure_ scenario that this Login Manager is built for. If you need security, ***do not*** use this. :exclamation: |
|---|
