'use strict';

var ImplementationTypeHelper = require('../../../helper/ImplementationTypeHelper'),
  InputOutputHelper = require('../../../helper/InputOutputHelper');

var entryFactory = require('../../../factory/EntryFactory'),
  cmdHelper = require('../../../helper/CmdHelper');



var DEFAULT_OPTIONS = [
  {value: '', name: '' },
  { value: 'create', name: 'Create' },
  { value: 'read', name: 'Read' },
  { value: 'update', name: 'Update' },
  { value: 'delete', name: 'Delete' }

];

/*
for filter input to request based on filters
*/
function isRead(){
  return !($('#camunda-method-select').val() === 'read') ;
}

/*
$('#camunda-method-select').val() === 'read' removed read so that multiple data can be requested
*/
function isId() {
  console.log($('#camunda-method-select').val());
  return !( $('#camunda-method-select').val() === 'update' || $('#camunda-method-select').val() === 'delete');
}
function isData() {
  console.log($('#camunda-method-select').val());
  return !($('#camunda-method-select').val() === 'create' || $('#camunda-method-select').val() === 'update');
}
function isVersion() {
  console.log($('#camunda-method-select').val());
  return !($('#camunda-method-select').val() === 'delete');
}
function isDelete() {
  return !($('#camunda-method-select').val() === 'delete');
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
  //console.log(element)
  return getImplementationType(element) === 'oeconnector';
}

module.exports = function (group, element, bpmnFactory) {

  group.entries.push(entryFactory.textField({
    id: 'connectorModel',
    label: 'Model',
    modelProperty: 'model',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('model');
      return { model: value };
    },

    set: function (element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        model: values.model || undefined
      });
    },

    validate: function (element, values, node) {
      return isConnector(element) && !values.model ? { model: 'Must provide a value' } : {};
    },

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
      if (values.method == 'read') {
        $('#camunda-modelData').val('');
        $('#camunda-modelVersion').val('');
        values.modelData = undefined; values.modelVersion = undefined;
      }
      else if (values.method == 'create') {
        $('#camunda-modelId').val('');
        $('#camunda-modelVersion').val('');
        values.modelId = undefined; values.modelVersion = undefined;

      }
      else if (values.method == 'update') {
        $('#camunda-modelVersion').val('');
        values.modelVersion = undefined;
      }
      else if (values.method == 'delete') {
        $('#camunda-modelData').val('');
        values.modelData = undefined;
      }


      return cmdHelper.updateBusinessObject(element, connector, {
        method: values.method || undefined,
        modelFilter: values.modelFilter || undefined,
         modelId: values.modelId || undefined,
          modelData: values.modelData || undefined,
          modelVersion: values.modelVersion || undefined
      });
    }
  })
  );

  /***************************************Model configuration for oe connector********************************************/
  group.entries.push(entryFactory.textField({
    id: 'modelId',
    label: 'Id',
    modelProperty: 'modelId',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('modelId');

      return { modelId: value };
    },

    set: function (element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        modelId: values.modelId || undefined
      });
    },

    validate: function (element, values, node) {
      return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
    },

    disabled: function (element, node) {

      return isId();//false;//!isConnector(element);
    }

  }));
  group.entries.push(entryFactory.textField({
    id: 'modelFilter',
    label: 'Filter',
    modelProperty: 'modelFilter',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('modelFilter');
      return { modelFilter: value };
    },

    set: function (element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        modelFilter: values.modelFilter || undefined
      });
    },

    validate: function (element, values, node) {
      return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
    },

    disabled: function (element, node) {
      return isRead();//!isConnector(element);
    }

  }));
  group.entries.push(entryFactory.textField({
    id: 'modelData',
    label: 'Data',
    modelProperty: 'modelData',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('modelData');
      return { modelData: value };
    },

    set: function (element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        modelData: values.modelData || undefined
      });
    },

    validate: function (element, values, node) {
      return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
    },

    disabled: function (element, node) {
      return isData();//!isConnector(element);
    }

  }));
  group.entries.push(entryFactory.textField({
    id: 'modelVersion',
    label: 'Version',
    modelProperty: 'modelVersion',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('modelVersion');
      return { modelVersion: value };
    },

    set: function (element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        modelVersion: values.modelVersion || undefined
      });
    },

    validate: function (element, values, node) {
      return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
    },

    disabled: function (element, node) {
      // console.log(isConnector(element));
      return isVersion();//false;//!isConnector(element);
    }

  }));

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
