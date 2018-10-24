'use strict';
/*
Date - 19-01.2017 change

*/
var is = require('bpmn-js/lib/util/ModelUtil').is,
  entryFactory = require('../../../factory/EntryFactory');


module.exports = function(group, element) {
  if(is(element, 'camunda:Assignable')) {

    // Assignee
    /*  group.entries.push(entryFactory.textField({
      id : 'assignee',
      description : 'Assignee of the User Task',
      label : 'Assignee',
      modelProperty : 'assignee'
    }));*/

    // Candidate Users
    group.entries.push(entryFactory.textField({
      id : 'candidateUsers',
      description : 'A list of candidates for this User Task',
      label : 'Candidate Users',
      modelProperty : 'candidateUsers'
    }));

    // Excluded Users
    group.entries.push(entryFactory.textField({
      id : 'excludedUsers',
      description : 'A list of candidates for this User Task',
      label : 'Excluded Users',
      modelProperty : 'excludedUsers'
    }));

    // Candidate Groups
    group.entries.push(entryFactory.textField({
      id : 'candidateGroups',
      description : 'A list of candidate groups for this User Task',
      label : 'Candidate Groups',
      modelProperty : 'candidateGroups'
    }));

    // Excluded Groups
    group.entries.push(entryFactory.textField({
      id : 'excludedGroups',
      description : 'A list of candidate groups for this User Task',
      label : 'Excluded Groups',
      modelProperty : 'excludedGroups'
    }));

    // Candidate Roles
    group.entries.push(entryFactory.textField({
      id : 'candidateRoles',
      description : 'A list of candidate groups for this User Task',
      label : 'Candidate Roles',
      modelProperty : 'candidateRoles'
    }));

    // Excluded Roles
    group.entries.push(entryFactory.textField({
      id : 'excludedRoles',
      description : 'A list of candidate groups for this User Task',
      label : 'Excluded Roles',
      modelProperty : 'excludedRoles'
    }));

    // Due Date
    group.entries.push(entryFactory.textField({
      id : 'dueDate',
      description : 'The due date as an EL expression (e.g. ${someDate} or an ISO date (e.g. 2015-06-26T09:54:00)',
      label : 'Due Date',
      modelProperty : 'dueDate'
    }));

    // FollowUp Date
    group.entries.push(entryFactory.textField({
      id : 'followUpDate',
      description : 'The follow up date as an EL expression (e.g. ${someDate} or an ' +
      'ISO date (e.g. 2015-06-26T09:54:00)',
      label : 'Follow Up Date',
      modelProperty : 'followUpDate'
    }));

    // priority
    group.entries.push(entryFactory.textField({
      id : 'priority',
      description : 'Priority of this User Task',
      label : 'Priority',
      modelProperty : 'priority'
    }));

    // Task Category
    group.entries.push(entryFactory.selectBox({
      id : 'taskCategory',
      description : 'Kind of User Task',
      label : 'Task Category',
      selectOptions: [ { name: 'Basic Task', value: 'basic' }, { name: 'Multi Maker', value: 'multiMaker' }, { name: 'Checker', value: 'checker' }, { name: 'Checker-AutoFinalize', value: 'checkerAutoFinalize' }],
      modelProperty : 'taskCategory'
    }));

    // preCreateFunction
    group.entries.push(entryFactory.textField({
      id : 'preCreateFunction',
      description : 'Custom function to call before creating this User Task',
      label : 'Pre Create Function',
      modelProperty : 'preCreateFunction'
    }));

    // preCompleteFunction
    group.entries.push(entryFactory.textField({
      id : 'preCompleteFunction',
      description : 'Custom function to call before creating this User Task',
      label : 'Pre Complete Function',
      modelProperty : 'preCompleteFunction'
    }));

  }
};
