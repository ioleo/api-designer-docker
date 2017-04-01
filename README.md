# api-designer-docker

Docker image for Mulesoft Api Designer tool with local filesystem storage.

This project is based on [arthurtsang/raml-store](https://github.com/arthurtsang/raml-store) 
which is a fork of [brianmc/raml-store](https://github.com/brianmc/raml-store).

## Why?

Brian's project requires MongoDB as storage. Arthur's project is great (introduces local filesystem storage), 
but it has not been updated for over 2 years and relies on an old version of API Designer which does not 
support `RAML 1.0`.

## Usage

Assuming you have Docker installed, simply run

`docker run -d --name api-designer -v ${pwd}:/raml -p 3000:3000 loostro/api-designer-docker`

in the directory containig your RAML files, or replace the `${pwd}` with an absolute path to it.


## License

This project is released under the [MIT License](LICENSE.md).