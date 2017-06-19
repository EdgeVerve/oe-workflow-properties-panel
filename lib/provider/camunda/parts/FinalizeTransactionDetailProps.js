'use strict';

var ImplementationTypeHelper = require('../../../helper/ImplementationTypeHelper'),
  InputOutputHelper = require('../../../helper/InputOutputHelper');

var entryFactory = require('../../../factory/EntryFactory'),
  cmdHelper = require('../../../helper/CmdHelper');

var diableInput =false;

var DEFAULT_OPTIONS = [
  { value: '', name: '' },
  { value: 'processvariable', name: 'ProcessVariable' },
  { value: 'message', name: 'Message' },
  { value: 'approve', name: 'Approve' },
  { value: 'reject', name: 'Reject' }

];
/*
function isId() {
  console.log($('#camunda-method-select').val());
  return !($('#camunda-method-select').val() === 'read' || $('#camunda-method-select').val() === 'update' || $('#camunda-method-select').val() === 'delete');
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
*/
function getImplementationType(element) {
  return ImplementationTypeHelper.getImplementationType(element);
}

function getBusinessObject(element) {
  return ImplementationTypeHelper.getEVFServiceTaskLikeBusinessObject(element);
}

function getConnector(bo) {
  return InputOutputHelper.getFTConnector(bo);
}

function isConnector(element) {
  //console.log(element)
  return getImplementationType(element) === 'finalizetransactionconnector';
}

module.exports = function (group, element, bpmnFactory) {

  group.entries.push(entryFactory.selectBox({
    id: 'ftType',
    description: 'Configure the type of the task.',
    label: 'Type',
    selectOptions: DEFAULT_OPTIONS,// selectOptions,
    modelProperty: 'FTType',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('FTType');
   
      return { FTType: value };
    },
    set: function (element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      if(values.FTType === ''){
          values.FTType=undefined;
          diableInput = true;
      }
      diableInput = false;
      if(values.FTType === 'approve'  ){
          $('#camunda-ftValue').val('approved');
          diableInput = true;
      }
      if(values.FTType === 'reject'  ){
          $('#camunda-ftValue').val('rejected');
          diableInput = true;
          
      }
     /* if (values.method == 'read') {
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
*/

      return cmdHelper.updateBusinessObject(element, connector, {
        FTType: values.FTType || undefined,
        FTValue: values.FTValue || undefined
      });
    }
  })
  );

  /***************************************Model configuration for evf connector********************************************/
  group.entries.push(entryFactory.textField({
    id: 'ftValue',
    label: 'Value',
    modelProperty: 'FTValue',

    get: function (element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('FTValue');

      return { FTValue: value };
    },

    set: function (element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        FTValue: values.FTValue || undefined
      });
    },

    validate: function (element, values, node) {
      return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
    },

    disabled: function (element, node) {

      return diableInput;//false;//!isConnector(element);
    }

  }));
  // group.entries.push(entryFactory.textField({
  //   id: 'modelData',
  //   label: 'Data',
  //   modelProperty: 'modelData',

  //   get: function (element, node) {
  //     var bo = getBusinessObject(element);
  //     var connector = bo && getConnector(bo);
  //     var value = connector && connector.get('modelData');
  //     return { modelData: value };
  //   },

  //   set: function (element, values, node) {
  //     var bo = getBusinessObject(element);
  //     var connector = getConnector(bo);
  //     return cmdHelper.updateBusinessObject(element, connector, {
  //       modelData: values.modelData || undefined
  //     });
  //   },

  //   validate: function (element, values, node) {
  //     return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
  //   },

  //   disabled: function (element, node) {
  //     return false;//isData();//!isConnector(element);
  //   }

  // }));
  // group.entries.push(entryFactory.textField({
  //   id: 'modelVersion',
  //   label: 'Version',
  //   modelProperty: 'modelVersion',

  //   get: function (element, node) {
  //     var bo = getBusinessObject(element);
  //     var connector = bo && getConnector(bo);
  //     var value = connector && connector.get('modelVersion');
  //     return { modelVersion: value };
  //   },

  //   set: function (element, values, node) {
  //     var bo = getBusinessObject(element);
  //     var connector = getConnector(bo);
  //     return cmdHelper.updateBusinessObject(element, connector, {
  //       modelVersion: values.modelVersion || undefined
  //     });
  //   },

  //   validate: function (element, values, node) {
  //     return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
  //   },

  //   disabled: function (element, node) {
  //     // console.log(isConnector(element));
  //     return  false;//isVersion();//false;//!isConnector(element);
  //   }

  // }));

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
