exports.$summaries = function($resource) {
  return $resource('/api/v1/summary/:dog/:difficulty');
};
