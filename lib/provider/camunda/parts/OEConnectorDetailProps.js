'use strict';

var ImplementationTypeHelper = require('../../../helper/ImplementationTypeHelper'),
  InputOutputHelper = require('../../../helper/InputOutputHelper');

var entryFactory = require('../../../factory/EntryFactory'),
  cmdHelper = require('../../../helper/CmdHelper');



var DEFAULT_OPTIONS = [
  {value: '', name: '' }
];
var optionStrings = "";
var modelOptions = "";
var METHOD_ARGS = {};

var diagramDetails = {
  async: false,
  url: '/designer/routes/',
  type: 'GET',
  error: function () {
    alert('Unable to fecth the Methods associated with the model');
  },
  success: function (response) {
    if(response.length == 0) {
      alert('There are no methods associated with the model');
    }
    optionStrings = "";
    if(response && typeof response === 'object' && response.constructor.name === 'Array') {
      for ( var methodIndx in response){
        var method = response[methodIndx];
        if (method && typeof method !== 'undefined') {
          optionStrings += "<option value='" + method.method + "'>" + method.method + "</option>";
          METHOD_ARGS[method.method] = method.accepts;
        }
      }
    } 
  }
}
var modelDefinitions = {
  async: false,
  url: '/api/ModelDefinitions/',
  type: 'GET',
  error: function () {
    alert('Unable to fecth the Model Definitions');
  },
  success: function (response) {
    if(response.length == 0) {
      alert('There are current zero models');
    }
    modelOptions = "";
    if(response && typeof response === 'object' && response.constructor.name === 'Array') {
      for ( var methodIndx in response){
        var method = response[methodIndx];
        modelOptions += "<option value='" + method.name + "'>" + method.name + "</option>";
      }
    }
  }
}
  function populateMethods() {
    $('#camunda-method-select').empty();
    $('#camunda-method-select').append(optionStrings);
  }
  function populateModels() {
    $('#camunda-connectorModel-select').empty();
    $('#camunda-connectorModel-select').append(modelOptions);
  }
  /*
$('#camunda-method-select').val() === 'read' removed read so that multiple data can be requested
*/
  function getImplementationType(element) {
    return ImplementationTypeHelper.getImplementationType(element);
  }

  function getBusinessObject(element) {
    return ImplementationTypeHelper.getOEServiceTaskLikeBusinessObject(element);
  }

  function getConnector(bo) {
    return InputOutputHelper.getOEConnector(bo);
  }

  function isConnector(element) {
    //console.log(element)
    return getImplementationType(element) === 'oeconnector';
  }

  module.exports = function (group, element, bpmnFactory) {

    $.ajax(modelDefinitions);
    populateModels();
    // if($("#camunda-connectorModel-select").val()) {
    //   diagramDetails.url = diagramDetails.url+ $("camunda-connectorModel-select").val() +'s?filter={"scope":{}}'
    //   $.ajax(diagramDetails);
    //   populateMethods();
    // }
    group.entries.push(entryFactory.selectBox({
      id: 'connectorModel',
      label: 'Model',
      modelProperty: 'model',
      selectOptions: DEFAULT_OPTIONS,

      get: function (element, node) {
        var bo = getBusinessObject(element);
        var connector = bo && getConnector(bo);
        var value = connector && connector.get('model');
        return { model: value };
      },

      set: function (element, values, node) {
        var bo = getBusinessObject(element);
        var connector = getConnector(bo);
        //var modelName = $("camunda-connectorModel-select").val();

        diagramDetails.url = '/designer/routes/'+ values.model +'s?filter={"scope":{}}'
        $.ajax(diagramDetails);
        populateMethods();
        return cmdHelper.updateBusinessObject(element, connector, {
          model: values.model || undefined
        });
      },

      //validate: function (element, values, node) {
      //  return isConnector(element) && !values.model ? { model: 'Must provide a value' } : {};
      //},

      // disabled: function(element, node) {
      //   return !isConnector(element);
      // }

    }));

    // group.entries.push(entryFactory.textField({
    //     id: 'connectorMethod',
    //     label: 'Method',
    //     modelProperty: 'method',

    //     get: function(element, node) {
    //       var bo = getBusinessObject(element);
    //       var connector = bo && getConnector(bo);
    //       var value = connector && connector.get('method');
    //       return { method: value };
    //     },

    //     set: function(element, values, node) {
    //       var bo = getBusinessObject(element);
    //       var connector = getConnector(bo);
    //       return cmdHelper.updateBusinessObject(element, connector, {
    //         method: values.method || undefined
    //       });
    //     },

    //     validate: function(element, values, node) {
    //       return isConnector(element) && !values.method ? { method: 'Must provide a value'} : {};
    //     },

    //     disabled: function(element, node) {
    //       return !isConnector(element);
    //     }

    //   }));

    /*group.entries.push(entryFactory.textArea({
    id: 'connectorData',
    label: 'Data',
    modelProperty: 'data',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('data');
      return { data: value };
    },

    set: function (element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        data: values.data || undefined
      });
    },

    validate: function (element, values, node) {
      return isConnector(element) && !values.data ? { data: 'Must provide a value' } : {};
    },

    disabled: function (element, node) {
      return !isConnector(element);
    }

  }));
  */

    group.entries.push(entryFactory.selectBox({
      id: 'method',
      description: 'Configure the implementation of the task.',
      label: 'Method',
      selectOptions: DEFAULT_OPTIONS,// selectOptions,
      modelProperty: 'method',

      get: function (element, node) {
        var bo = getBusinessObject(element);
        var connector = bo && getConnector(bo);
        var value = connector && connector.get('method');

        return { method: value };
      },
      set: function (element, values, node) {
        var bo = getBusinessObject(element);
        var connector = getConnector(bo);
        return cmdHelper.updateBusinessObject(element, connector, {
          method: values.method || undefined
          //        args: values.args || undefined
        });
      }
    }));

    group.entries.push(entryFactory.textArea({
      id: 'args',
      label: 'Arguments', 
      modelProperty: 'args',

      get: function (element, node) {
        var bo = getBusinessObject(element);
        var connector = bo && getConnector(bo);
        var value = connector && connector.get('args');
        return { args: value };
      },

      set: function (element, values, node) {
        var bo = getBusinessObject(element);
        var connector = getConnector(bo);
        return cmdHelper.updateBusinessObject(element, connector, {
          args : values.args || undefined
        });
      }

      //    validate: function (element, values, node) {
      // return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
      //},

      //disabled: function (element, node) {
      // return false;//isIdDisabled();//false;//!isConnector(element);
      //}
    }));
    /***************************************Model configuration for oe connector********************************************/

    /*
  group.entries.push(entryFactory.textField({
      id: 'connectorMessage',
      label: 'Message',
      modelProperty: 'message',

      get: function(element, node) {
        var bo = getBusinessObject(element);
        var connector = bo && getConnector(bo);
        var value = connector && connector.get('message');
        return { message: value };
      },

      set: function(element, values, node) {
        var bo = getBusinessObject(element);
        var connector = getConnector(bo);
        return cmdHelper.updateBusinessObject(element, connector, {
          message: values.message || undefined
        });
      },

      validate: function(element, values, node) {
        return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
      },

      disabled: function(element, node) {
        return !isConnector(element);
      }

    }));
    */
    /*
  group.entries.push(entryFactory.textField({
      id: 'connectorId',
      label: 'Connector Id',
      modelProperty: 'connectorId',

      get: function(element, node) {
        var bo = getBusinessObject(element);
        var connector = bo && getConnector(bo);
        var value = connector && connector.get('connectorId');
        return { connectorId: value };
      },

      set: function(element, values, node) {
        var bo = getBusinessObject(element);
        var connector = getConnector(bo);
        return cmdHelper.updateBusinessObject(element, connector, {
          connectorId: values.connectorId || undefined
        });
      },

      validate: function(element, values, node) {
        return isConnector(element) && !values.connectorId ? { connectorId: 'Must provide a value'} : {};
      },

      disabled: function(element, node) {
        return !isConnector(element);
      }

    }));
    */

  };
