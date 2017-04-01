// This part is needed only if you want to provide your own Persistance Implementation
// Angular Module must match "ramlEditorApp"
angular.module('ramlEditorApp')
.factory('MyFileSystem', function ($http, $q, config) {
    console.log("is this defined?")
    var service = {};

    function errorFunction(data, status, headers, config) {
        alert(status + ": " + data );
    };

    function putColors(){
        $(".file-name").each(function() {
            if($(this).html().lastIndexOf(".raml")  != -1 ){
                $(this).addClass("raml-file-browser");
            }
            else if($(this).html().lastIndexOf(".md")  != -1 ){
                $(this).addClass("md-file-browser");
            }
            else if($(this).html().lastIndexOf(".json")  != -1 ){
                $(this).addClass("json-file-browser");
            }
        });
    };

    service.directory = function (path) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            data: '',
            url: "/files/" + ((path==="/")?"":path),
            withCredentials: false
        }).success(function (data) {
            deferred.resolve({path: path, meta: {}, children: data});
            setTimeout(putColors, 100)
        })
            .error(errorFunction);
        return deferred.promise;
    };

    service.load = function (path, name) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            data: '',
            url: '/files' + path,
            withCredentials: false
        }).success(function (data) {
            deferred.resolve(data[0].content);
        })
            .error(deferred.reject.bind(deferred));
        return deferred.promise;
    };

    service.remove = function (path, name) {
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            data: '',
            url: '/files' + path,
            withCredentials: false
        }).success(function(data){
            deferred.resolve();
        }).error(deferred.reject.bind(deferred));
        return deferred.promise;
    };

    service.rename = function (source, destination) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            data: {
                action: 'rename',
                newName: destination
            },
            url: '/files' + source,
            withCredentials: false
        }).success(function(data){
            deferred.resolve();
        }).error(deferred.reject.bind(deferred));
        return deferred.promise;
    };

    service.createFolder = function (path) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: {
                type: 'folder'
            },
            url: '/files' + path,
            withCredentials: false
        }).success(function(data){
            deferred.resolve();
        }).error(deferred.reject.bind(deferred));
        return deferred.promise;
    };

    service.save = function (path, contents) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: {
                type: 'file',
                content: contents
            },
            url: '/files' + path,
            withCredentials: false
        }).success(function(data){
            deferred.resolve();
        }).error(deferred.reject.bind(deferred));
        return deferred.promise;
    };

    return service;
})
.config(function (fileSystemProvider, MyFileSystemProvider){
    fileSystemProvider.setFileSystemFactory(MyFileSystemProvider.$get);
})
.run(function ($rootScope) {
    // In case you want to send notifications to the user (for instance, that he must login to save).
    // The expires flags means whether it should be hidden after a period of time or the user should dismiss it manually.
    $rootScope.$broadcast('event:notification', {message: 'File saved.', expires: true});
});
