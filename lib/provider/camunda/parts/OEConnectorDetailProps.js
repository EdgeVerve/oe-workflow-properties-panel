'use strict';

var ImplementationTypeHelper = require('../../../helper/ImplementationTypeHelper'),
  InputOutputHelper = require('../../../helper/InputOutputHelper');

var entryFactory = require('../../../factory/EntryFactory'),
  cmdHelper = require('../../../helper/CmdHelper');

var MODEL_OPTIONS = [];
    
var DEFAULT_OPTIONS = [
  {value: '', name: '' }
];
var optionStrings = "";
var METHOD_ARGS = {};

  function populateMethods(modelName) {
    $.ajax({
      async: false,
      url: '/designer/routes/'+ modelName +'s?filter={"scope":{}}',
      type: 'GET',
      error: function () {
        alert('Unable to fecth the Methods associated with the model');
      },
      success: function (response) {
        if(response.length == 0) {
          alert('There are no methods associated with the model');
        }
        var optionStrings = "";
        if(response && typeof response === 'object' && response.constructor.name === 'Array') {
          for ( var methodIndx in response){
            var method = response[methodIndx];
            if (method && typeof method !== 'undefined') {
              optionStrings += "<option value='" + method.method + "'>" + method.method + "</option>";
              METHOD_ARGS[method.method] = method.accepts;
            }
          }
        }
        $('#camunda-method-select').empty();
        $('#camunda-method-select').append(optionStrings);      
      }
    })

  }

  function loadModelData(){
    if(MODEL_OPTIONS.length === 0){
      $.ajax({
        async: false,
        url: '/api/ModelDefinitions/?filter[fields]=name',
        type: 'GET',
        error: function () {
          alert('Unable to fecth the Model Definitions');
        },
        success: function(response){
          if(response && typeof response === 'object' && response.constructor.name === 'Array') {
            for ( var index in response){
              var model = response[index];
              MODEL_OPTIONS.push({name: model.name, value: model.name});
            }
          }
        }
      });
    }     
  }

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
    return getImplementationType(element) === 'oeconnector';
  }

  loadModelData();

  module.exports = function (group, element, bpmnFactory) {

    group.entries.push(entryFactory.selectBox({
      id: 'connectorModel',
      label: 'Model',
      modelProperty: 'model',
      selectOptions: MODEL_OPTIONS,

      get: function (element, node) {
        var bo = getBusinessObject(element);
        var connector = bo && getConnector(bo);
        var value = connector && connector.get('model');
        return { model: value };
      },

      set: function (element, values, node) {
        var bo = getBusinessObject(element);
        var connector = getConnector(bo);
        populateMethods(values.model);
        return cmdHelper.updateBusinessObject(element, connector, {
          model: values.model || undefined
        });
      },
    }));


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

    }));
    /***************************************Model configuration for oe connector********************************************/
  };
