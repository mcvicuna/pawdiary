exports.$trials = function($resource) {
  return $resource('/api/v1/trials/:dog/:id/');
};
