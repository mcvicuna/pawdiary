exports.$dogs = function($resource) {
  return $resource('/api/v1/dogs/:id');
};
