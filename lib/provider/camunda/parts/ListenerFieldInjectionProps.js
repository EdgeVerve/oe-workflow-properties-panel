'use strict';

var assign = require('lodash/object/assign');

var fieldInjection = require('./implementation/FieldInjection');

module.exports = function(group, element, bpmnFactory, options) {

  options = assign({
    idPrefix: 'listener-',
    insideListener: true
  }, options);

  var fieldInjectionEntry = fieldInjection(element, bpmnFactory, options);

  if (fieldInjectionEntry && fieldInjectionEntry.length > 0) {
    group.entries = group.entries.concat(fieldInjectionEntry);
  }

};
