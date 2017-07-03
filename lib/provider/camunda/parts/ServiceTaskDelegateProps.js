'use strict';

var ImplementationTypeHelper = require('../../../helper/ImplementationTypeHelper'),
  InputOutputHelper = require('../../../helper/InputOutputHelper');

var implementationType = require('./implementation/ImplementationType'),
  delegate = require('./implementation/Delegate'),
  external = require('./implementation/External'),
  callable = require('./implementation/Callable'),
  resultVariable = require('./implementation/ResultVariable');

var entryFactory = require('../../../factory/EntryFactory');

var domQuery = require('min-dom/lib/query'),
  domClosest = require('min-dom/lib/closest'),
  domClasses = require('min-dom/lib/classes');

function getImplementationType(element) {
  // console.log(element)
  return ImplementationTypeHelper.getImplementationType(element);
}

function getBusinessObject(element) {
  return ImplementationTypeHelper.getServiceTaskLikeBusinessObject(element);
}

function isDmnCapable(element) {
  return ImplementationTypeHelper.isDmnCapable(element);
}

function isExternalCapable(element) {
  return ImplementationTypeHelper.isExternalCapable(element);
}

function isServiceTaskLike(element) {
  return ImplementationTypeHelper.isServiceTaskLike(element);
}

function isEVServiceTaskLike(element) {
  return ImplementationTypeHelper.isServiceTaskLike(element);
}

function isFTServiceTaskLike(element) {
  return ImplementationTypeHelper.isFTServiceTaskLiket(element);
}

module.exports = function (group, element, bpmnFactory) {

  if (!isServiceTaskLike(getBusinessObject(element))) {
    return;
  }

  var hasDmnSupport = isDmnCapable(element);
  var hasExternalSupport = isExternalCapable(getBusinessObject(element));

  // implementation type ////////////////////////////////////

  group.entries = group.entries.concat(implementationType(element, bpmnFactory, {
    getBusinessObject: getBusinessObject,
    getImplementationType: getImplementationType,
    hasDmnSupport: hasDmnSupport,
    hasExternalSupport: hasExternalSupport,
    hasServiceTaskLikeSupport: isServiceTaskLike,
    hasEVServiceTaskLikeSupport: isEVServiceTaskLike,
    hasFTServiceTaskLikeSupport: isFTServiceTaskLike,
  }));


  // delegate (class, expression, delegateExpression) //////////

  group.entries = group.entries.concat(delegate(element, bpmnFactory, {
    getBusinessObject: getBusinessObject,
    getImplementationType: getImplementationType
  }));


  // result variable /////////////////////////////////////////

  group.entries = group.entries.concat(resultVariable(element, bpmnFactory, {
    getBusinessObject: getBusinessObject,
    getImplementationType: getImplementationType,
    hideResultVariable: function (element, node) {
      return getImplementationType(element) !== 'expression';
    }
  }));

  // external //////////////////////////////////////////////////

  if (hasExternalSupport) {
    group.entries = group.entries.concat(external(element, bpmnFactory, {
      getBusinessObject: getBusinessObject,
      getImplementationType: getImplementationType
    }));
  }


  // dmn ////////////////////////////////////////////////////////

  if (hasDmnSupport) {
    group.entries = group.entries.concat(callable(element, bpmnFactory, {
      getCallableType: getImplementationType
    }));
  }


  // connector ////////////////////////////////////////////////

  var isConnector = function (element) {
    console.log("Type1: " + getImplementationType(element));
    return getImplementationType(element) === 'connector';
  };

  var isOEConnector = function (element) {
    console.log("Type2: " + getImplementationType(element));
    return getImplementationType(element) === 'oeconnector';
  };

  var isFTConnector = function (element) {
    console.log("Type2: " + getImplementationType(element));
    return getImplementationType(element) === 'finalizetransactionconnector';
  };
  group.entries.push(entryFactory.link({
    id: 'configureConnectorLink',
    label: 'Configure Connector',
    getClickableElement: function (element, node) {
      var panel = domClosest(node, 'div.djs-properties-panel');
      return domQuery('a[data-tab-target="connector"]', panel);
    },
    hideLink: function (element, node) {
      var link = domQuery('a', node);
      link.innerHTML = link.textContent = '';
      domClasses(link).remove('pp-error-message');

      if (isConnector(element)) {
        //var connectorId = InputOutputHelper.getConnector(element).get('connectorUrl');
        var connectorId = InputOutputHelper.getConnector(element).url;
        // console.log('ConnectorId: ' + connectorId);
        if (connectorId) {
          link.textContent = 'Configure Connector';
        } else {
          link.innerHTML = '<span class="pp-icon-warning"></span> Must configure Connector';
          domClasses(link).add('pp-error-message');
        }

        return false;
      } else if (isOEConnector(element)) {

      }else if(isFTConnector(element)){

      }
      return true;
    }
  }));

};