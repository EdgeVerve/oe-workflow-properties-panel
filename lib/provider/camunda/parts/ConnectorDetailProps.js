'use strict';

var ImplementationTypeHelper = require('../../../helper/ImplementationTypeHelper'),
    InputOutputHelper        = require('../../../helper/InputOutputHelper');

var entryFactory            = require('../../../factory/EntryFactory'),
    cmdHelper               = require('../../../helper/CmdHelper');

function getImplementationType(element) {
  return ImplementationTypeHelper.getImplementationType(element);
}

function getBusinessObject(element) {
  return ImplementationTypeHelper.getServiceTaskLikeBusinessObject(element);
}

function getConnector(bo) {
  return InputOutputHelper.getConnector(bo);
}

function isConnector(element) {
  return getImplementationType(element) === 'connector';
}

module.exports = function(group, element, bpmnFactory) {

  group.entries.push(entryFactory.textField({
    id: 'connectorUrl',
    label: 'URL',
    modelProperty: 'url',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('url');
     
      console.log("value of url ==="+value)
      return { url: value, ctype:'rest' };
    },

    set: function(element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        url: values.url || undefined,
        ctype:"rest"
      });
    },

    validate: function(element, values, node) {
      return isConnector(element) && !values.url ? { url: 'Must provide a value'} : {};
    },

    disabled: function(element, node) {
      return !isConnector(element);
    }

  }));

group.entries.push(entryFactory.textField({
    id: 'connectorMethod',
    label: 'Method',
    modelProperty: 'method',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('method');
      return { method: value };
    },

    set: function(element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        method: values.method || undefined
      });
    },

    validate: function(element, values, node) {
      return isConnector(element) && !values.method ? { method: 'Must provide a value'} : {};
    },

    disabled: function(element, node) {
      return !isConnector(element);
    }

  }));

group.entries.push(entryFactory.textArea({
    id: 'connectorData',
    label: 'Data',
    modelProperty: 'data',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('data');
      return { data: value };
    },

    set: function(element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        data: values.data || undefined
      });
    },

    validate: function(element, values, node) {
      return isConnector(element) && !values.data ? { data: 'Must provide a value'} : {};
    },

    disabled: function(element, node) {
      return !isConnector(element);
    }

  }));

group.entries.push(entryFactory.textField({
    id: 'connectorHeaders',
    label: 'Headers',
    modelProperty: 'headers',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
      var value = connector && connector.get('headers');
      return { headers: value };
    },

    set: function(element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        headers: values.headers || undefined
      });
    },

    validate: function(element, values, node) {
      return true;//isConnector(element) && !values.headers ? { connectorId: 'Must provide a value'} : {};
    },

    disabled: function(element, node) {
      return !isConnector(element);
    }

  }));


 group.entries.push(entryFactory.textField({
    id: 'connectorRetries',
    label: 'Number Of Retries',
    modelProperty: 'retries',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
     // console.log("=================================================================================================")
      
      console.log(connector)
      var value = connector && connector.get('retries');
      return { retries: value };
    },

    set: function(element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        retries: values.retries || undefined
      });
    },

    validate: function(element, values, node) {
      return true;//isConnector(element) && !values.retries ? { retries: 'Must provide a value'} : {};
    },

    disabled: function(element, node) {
      return !isConnector(element);
    }

  }));

  group.entries.push(entryFactory.textField({
    id: 'connectorTimeout',
    label: 'Timeout(ms)',
    modelProperty: 'timeout',

    get: function(element, node) {
      var bo = getBusinessObject(element);
      var connector = bo && getConnector(bo);
     // console.log("=================================================================================================")
      
      console.log(connector)
      var value = connector && connector.get('timeout');
      return { timeout: value };
    },

    set: function(element, values, node) {
      var bo = getBusinessObject(element);
      var connector = getConnector(bo);
      return cmdHelper.updateBusinessObject(element, connector, {
        timeout: values.timeout || undefined
      });
    },

    validate: function(element, values, node) {
      return true;//isConnector(element) && !values.timeout ? { timeout: 'Must provide a value'} : {};
    },

    disabled: function(element, node) {
      return !isConnector(element);
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
