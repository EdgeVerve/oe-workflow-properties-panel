'use strict';

var textArea = function(options, defaultParameters) {

  var resource = defaultParameters,
    label = options.label || resource.id,
    canBeShown = !!options.show && typeof options.show === 'function',
    expandable = options.expandable,
    minRows = options.minRows,
    maxRows = options.maxRows;

  resource.html =
   '<div class="style-scope work-flow pp-field-wrapper input-field" ' +
    (canBeShown ? 'data-show="isShown"' : '') +
    '>' +
    '<label for="camunda-' + resource.id + '" ' +
    (canBeShown ? 'data-show="isShown"' : '') +
    '>' + label + '</label>' +
  //  '<div class="pp-field-wrapper" ' +
  //  (canBeShown ? 'data-show="isShown"' : '') +
  //  '>' +
      '<textarea class="style-scope work-flow materialize-textarea" id="camunda-' + resource.id + '" ' +
                'name="' + options.modelProperty + '" ' +
                (expandable ? 'data-expandable ' : '') +
                (minRows ? 'data-min-rows="' + minRows + '" ' : '') +
                (maxRows ? 'data-max-rows="' + maxRows + '" ' : '') +
      '>' +
      '</textarea>' +
    '</div>';

  if(canBeShown) {
    resource.isShown = function() {
      return options.show.apply(resource, arguments);
    };
  }

  resource.cssClasses = ['pp-textarea','style-scope', 'work-flow'];

  return resource;
};

module.exports = textArea;
