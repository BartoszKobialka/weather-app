import React from 'react';
import settingsIcon from '../../assets/settings-icon.png';
import './Settings.scss';

export interface SettingsProps {
  isImperialUnit: boolean;
  onUnitsSystemChanged: any;
}

export interface SettingsState {
  isSettingVisible: boolean;
}

class Settings extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);
    this.state = { isSettingVisible: false };
  }

  render() {
    return (
      <div
        className={
          'settings ' + (this.state.isSettingVisible && 'settings-expanded')
        }
        onMouseLeave={() => this.setState({ isSettingVisible: false })}
      >
        {!this.state.isSettingVisible && (
          <img
            onClick={() => this.setState({ isSettingVisible: true })}
            src={settingsIcon}
            alt="settings"
          />
        )}
        {this.state.isSettingVisible && (
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={this.props.onUnitsSystemChanged}
              checked={this.props.isImperialUnit}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Imperial units
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default Settings;
