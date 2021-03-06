import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Card, Icon } from 'antd';
import { withData } from '../../../Contexts/DataContext/withData';
import { withInteraction } from '../../../Contexts/InteractionContext/withInteraction';
import Selector from '../../../Components/Selector';
import MacroNameMap from '../../../Modules/MacroNameMap';

import './WaterfallConfig.css';

class WaterfallConfig extends Component {
  static propTypes = {
    toggleView: PropTypes.func.isRequired,
    interaction: PropTypes.shape({
      fields: PropTypes.shape({
        availableCountries: PropTypes.arrayOf(PropTypes.string.isRequired)
          .isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    const { availableCountries } = this.props.interaction.fields;
    const { country, group } = this.props;

    const GET_GROUP_OPTIONS = gql`
      {
        names(type: MACRO)
      }
    `;

    const handleChange = type => value => {
      this.props.handleChange({ [type]: value });
    };

    return (
      <Query query={GET_GROUP_OPTIONS}>
        {({ loading, error, data }) => {
          if (error)
            return console.log('Error loading gql data for WaterfallConfig');

          return (
            <Card
              size="small"
              bodyStyle={{ width: 324, height: 424 }}
              title="Waterfall Config"
              extra={
                <Icon
                  type="close"
                  theme="outlined"
                  onClick={this.props.handleClose}
                />
              }
            >
              {loading || this.props.data.loading ? (
                'Loading...'
              ) : (
                <div className="WaterfallConfig">
                  <Selector
                    placeholder="Select a country"
                    options={availableCountries}
                    handleChange={handleChange('country')}
                    value={country || undefined}
                  />
                  <Selector
                    placeholder="Select a group"
                    options={data.names.map(name => ({
                      value: name,
                      display: MacroNameMap[name],
                    }))}
                    handleChange={handleChange('group')}
                    value={group || undefined}
                  />
                  <Button type="primary" onClick={this.props.toggleView}>
                    Visualize
                  </Button>
                </div>
              )}
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default withInteraction(withData(WaterfallConfig));
