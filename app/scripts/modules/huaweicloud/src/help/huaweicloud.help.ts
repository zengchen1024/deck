import { HelpContentsRegistry } from '@spinnaker/core';

const helpContents: { [key: string]: string } = {
  'huaweicloud.loadBalancer.detail':
    '(Optional) A string of free-form alphanumeric characters; by convention, we recommend using "frontend".',
  'huaweicloud.loadBalancer.stack':
    '(Optional) One of the core naming components of a cluster, used to create vertical stacks of dependent services for integration testing.',
  'huaweicloud.loadBalancer.subnet': 'The subnet where the instances for this load balancer reside.',
  'huaweicloud.loadBalancer.protocol':
    'The protocol for the traffic to be load balanced. Currently, only HTTP and HTTPS are supported.',
  'huaweicloud.loadBalancer.network':
    'The network containing the floating IP pool from which this load balancer will obtain and bind to a floating IP.',
  'huaweicloud.loadBalancer.port': 'The TCP port on which this load balancer will listen.',
  'huaweicloud.loadBalancer.targetPort':
    'The TCP port on instances associated with this load balancer to which traffic is sent.',
  'huaweicloud.loadBalancer.distribution':
    'The method by which traffic is distributed to the instances.<dl><dt>Least Connections</dt><dd>Sends the request to the instance with the fewest active connections.</dd><dt>Round Robin</dt><dd>Evenly spreads requests across instances.</dd><dt>Source IP</dt><dd>Attempts to deliver requests from the same IP to the same instance.</dd></dl>',
  'huaweicloud.loadBalancer.healthCheck.timeout':
    '<p>Configures the timeout, in seconds, for obtaining the healthCheck status. This value must be less than the interval.</p><p> Default: <b>1</b></p>',
  'huaweicloud.loadBalancer.healthCheck.delay':
    '<p>The interval, in seconds, between health checks.</p><p>Default: <b>10</b></p>',
  'huaweicloud.loadBalancer.healthCheck.maxRetries':
    '<p>The number of retries before declaring an instance as failed and removing it from the pool.</p><p>Default: <b>2</b></p>',
  'huaweicloud.loadBalancer.healthCheck.statusCodes':
    'A list of HTTP status codes that will be considered a successful response.',
  'huaweicloud.network.floatingip':
    '<p>Whether or not each instance in the server group should be assigned a floating ip.</p><p>Default: <b>No</b></p>',
  'huaweicloud.network.floatpool': 'The network from which to allocate a floating ip',
  'huaweicloud.serverGroup.userData': '<p>Provides a script that will run when each server group instance starts.</p>',
  'huaweicloud.serverGroup.availabilityZones':
    'Creates a Senlin Zone Placement Policy that balances equally across the selected zones.',
  'huaweicloud.serverGroup.tags':
    '<p>Key-value pairs of metadata that will be associate to each server group instance.</p>',
  'huaweicloud.serverGroup.schedulerHints': '<p>Key-value pairs for server scheduling hints</p>',
  'huaweicloud.serverGroup.removeEIP': 'Release EIP when instances are removed from the server group',
};

Object.keys(helpContents).forEach(key => HelpContentsRegistry.register(key, helpContents[key]));
