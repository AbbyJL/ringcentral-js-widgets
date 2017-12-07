'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _Switch = require('../Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _DropdownSelect = require('../DropdownSelect');

var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _LinkLine = require('../LinkLine');

var _LinkLine2 = _interopRequireDefault(_LinkLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CheckBox(_ref) {
  var checked = _ref.checked,
      onChange = _ref.onChange;

  var background = 'transparent';
  var border = 'solid 1px #e2e2e2';
  if (checked) {
    background = '#0684bd';
    border = 'solid 1px #0684bd';
  }
  return _react2.default.createElement(
    'div',
    {
      onClick: function onClick() {
        return onChange && onChange(!checked);
      },
      style: {
        width: 13,
        height: 13,
        fontSize: 13,
        lineHeight: '13px',
        color: '#fff',
        display: 'inline-block',
        textAlign: 'center',
        userSelect: 'none',
        background: background,
        border: border
      } },
    '\u2713'
  );
}

CheckBox.propTypes = {
  checked: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func
};

CheckBox.defaultProps = {
  onChange: null
};

function DialInNumberItem(_ref2) {
  var region = _ref2.region,
      formattedPhoneNumber = _ref2.formattedPhoneNumber;

  return _react2.default.createElement(
    'div',
    null,
    region,
    _react2.default.createElement(
      'span',
      { style: { float: 'right' } },
      formattedPhoneNumber
    )
  );
}
DialInNumberItem.propTypes = {
  region: _propTypes2.default.string.isRequired,
  formattedPhoneNumber: _propTypes2.default.string.isRequired
};

function DialInNumberList(_ref3) {
  var dialInNumbers = _ref3.dialInNumbers,
      selected = _ref3.selected,
      onChange = _ref3.onChange;

  if (dialInNumbers.length === 0) {
    return '';
  }
  return _react2.default.createElement(
    'ul',
    { className: _styles2.default.dialInNumberList },
    dialInNumbers.map(function (e) {
      var checked = selected.indexOf(e.phoneNumber) > -1;
      var selectChange = function selectChange() {
        var newSelection = [];
        if (checked) {
          selected.forEach(function (curNum) {
            return curNum !== e.phoneNumber && newSelection.push(curNum);
          });
        } else {
          newSelection = selected.concat(e.phoneNumber);
        }
        onChange(newSelection);
      };
      return _react2.default.createElement(
        'li',
        {
          key: e.phoneNumber,
          onClick: selectChange
        },
        _react2.default.createElement(CheckBox, { className: _styles2.default.checkbox, checked: checked }),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.region },
          e.region
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.phoneNumber },
          e.formattedPhoneNumber
        )
      );
    })
  );
}
DialInNumberList.propTypes = {
  dialInNumbers: _propTypes2.default.array.isRequired,
  selected: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func.isRequired
};

function formatPin(number) {
  return number.replace(/(\d{3})/g, '$1-').replace(/-$/, '');
}

var ConferencePanel = function (_Component) {
  (0, _inherits3.default)(ConferencePanel, _Component);

  function ConferencePanel(props) {
    (0, _classCallCheck3.default)(this, ConferencePanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConferencePanel.__proto__ || (0, _getPrototypeOf2.default)(ConferencePanel)).call(this, props));

    _this.onAddionalNumbersSwitch = function (checked) {
      _this.setState({
        showAdditionalNumbers: checked
      });
    };

    _this.inviteWithText = function () {
      _this.props.inviteWithText(_this.inviteTxt());
    };

    _this.state = {
      dialInNumbers: _this.formatDialInNumbers(props),
      showAdditionalNumbers: false,
      showAdditionalNumberList: false
    };
    return _this;
  }

  (0, _createClass3.default)(ConferencePanel, [{
    key: 'inviteTxt',
    value: function inviteTxt() {
      var _props = this.props,
          dialInNumber = _props.dialInNumber,
          additionalNumbers = _props.additionalNumbers,
          participantCode = _props.participantCode;
      var _state = this.state,
          dialInNumbers = _state.dialInNumbers,
          showAdditionalNumbers = _state.showAdditionalNumbers;

      var formattedDialInNumber = dialInNumbers.find(function (e) {
        return e.phoneNumber === dialInNumber;
      }).formattedPhoneNumber;
      var additionalNumbersTxt = additionalNumbers.map(function (p) {
        return dialInNumbers.find(function (obj) {
          return obj.phoneNumber === p;
        });
      }).map(function (fmt) {
        return fmt.region + '  ' + fmt.formattedPhoneNumber;
      }).join('\n');
      var additionalNumbersSection = '';
      if (showAdditionalNumbers) {
        additionalNumbersSection = '\n\nInternational Dial-in Numbers:\n' + additionalNumbersTxt + '\n\n';
      }
      return '\nPlease join the RingCentral conference.\n\nDial-In Numbers:' + formattedDialInNumber + '\n' + additionalNumbersSection + '\nParticipant Access: ' + formatPin(participantCode) + '\n\nNeed an international dial-in phone number? Please visit https://rcconf.net/1L06Hd5\n\nThis conference call is brought to you by RingCentral Conferencing.';
    }
  }, {
    key: 'formatDialInNumbers',
    value: function formatDialInNumbers(_ref4) {
      var dialInNumbers = _ref4.dialInNumbers,
          countryCode = _ref4.countryCode,
          areaCode = _ref4.areaCode;

      return dialInNumbers.map(function (e) {
        return (0, _extends3.default)({}, e, {
          formattedPhoneNumber: (0, _formatNumber2.default)({
            phoneNumber: e.phoneNumber,
            countryCode: countryCode,
            areaCode: areaCode,
            international: true
          })
        });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.dialInNumbers !== this.props.dialInNumbers || nextProps.countryCode !== this.props.countryCode || nextProps.areaCode !== this.props.areaCode) {
        this.setState({
          dialInNumbers: this.formatDialInNumbers(nextProps)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          currentLocale = _props2.currentLocale,
          hostCode = _props2.hostCode,
          participantCode = _props2.participantCode,
          dialInNumber = _props2.dialInNumber,
          additionalNumbers = _props2.additionalNumbers,
          updateDialInNumber = _props2.updateDialInNumber,
          updateAdditionalNumbers = _props2.updateAdditionalNumbers,
          joinAsHost = _props2.joinAsHost,
          allowJoinBeforeHost = _props2.allowJoinBeforeHost,
          additionalButtons = _props2.additionalButtons,
          onAllowJoinBeforeHostChange = _props2.onAllowJoinBeforeHostChange,
          showHelpCommands = _props2.showHelpCommands;
      var _state2 = this.state,
          dialInNumbers = _state2.dialInNumbers,
          showAdditionalNumbers = _state2.showAdditionalNumbers,
          showAdditionalNumberList = _state2.showAdditionalNumberList;

      if (showAdditionalNumberList) {
        return _react2.default.createElement(
          'div',
          { className: _styles2.default.selectNumberPage },
          _react2.default.createElement(
            _BackHeader2.default,
            { onBackClick: function onBackClick() {
                return _this2.setState({ showAdditionalNumberList: false });
              } },
            _i18n2.default.getString('selectNumbers', currentLocale)
          ),
          _react2.default.createElement(DialInNumberList, {
            dialInNumbers: dialInNumbers,
            selected: additionalNumbers,
            onChange: updateAdditionalNumbers })
        );
      }
      var additionalNumberObjs = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var n = _step.value;

          additionalNumberObjs.push(dialInNumbers.find(function (e) {
            return e.phoneNumber === n;
          }));
        };

        for (var _iterator = (0, _getIterator3.default)(additionalNumbers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var additionalNumbersCtrl = showAdditionalNumbers ? _react2.default.createElement(
        'div',
        { style: { width: '100%' } },
        _react2.default.createElement(
          _LinkLine2.default,
          {
            className: _styles2.default.linkLine,
            onClick: function onClick() {
              _this2.setState({ showAdditionalNumberList: true });
            } },
          _i18n2.default.getString('selectNumbers', currentLocale)
        ),
        _react2.default.createElement(DialInNumberList, {
          dialInNumbers: additionalNumberObjs,
          selected: additionalNumbers,
          onChange: updateAdditionalNumbers })
      ) : '';
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.container },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.main },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.dialInNumber },
            _react2.default.createElement(
              'label',
              null,
              _i18n2.default.getString('dialInNumber', currentLocale)
            ),
            _react2.default.createElement(_DropdownSelect2.default, {
              className: _styles2.default.select,
              value: dialInNumber,
              onChange: function onChange(option) {
                return updateDialInNumber(option.phoneNumber);
              },
              renderFunction: DialInNumberItem,
              renderValue: function renderValue(phoneNumber) {
                var option = dialInNumbers.find(function (p) {
                  return p.phoneNumber === phoneNumber;
                });
                if (!option) {
                  console.warn('Conference dial in number ' + phoneNumber + ' is not found in the list.');
                }
                return DialInNumberItem(option || dialInNumbers[0]);
              },
              options: dialInNumbers,
              disabled: false,
              dropdownAlign: 'left',
              titleEnabled: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.formGroup },
            _react2.default.createElement(
              'label',
              null,
              _i18n2.default.getString('hostAccess', currentLocale)
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.field },
              formatPin(hostCode)
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.formGroup },
            _react2.default.createElement(
              'label',
              null,
              _i18n2.default.getString('participantsAccess', currentLocale)
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.field },
              formatPin(participantCode)
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.formGroup },
            _react2.default.createElement(
              'label',
              null,
              _i18n2.default.getString('addinalDialInNumbers', currentLocale)
            ),
            _react2.default.createElement(
              'span',
              { className: _styles2.default.field },
              _react2.default.createElement(_Switch2.default, {
                checked: showAdditionalNumbers,
                onChange: this.onAddionalNumbersSwitch
              })
            ),
            additionalNumbersCtrl
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.formGroup },
            _react2.default.createElement(
              'label',
              null,
              _i18n2.default.getString('enableJoinBeforeHost', currentLocale)
            ),
            _react2.default.createElement(
              'span',
              { className: _styles2.default.field },
              _react2.default.createElement(_Switch2.default, {
                checked: allowJoinBeforeHost,
                onChange: onAllowJoinBeforeHostChange
              })
            )
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              onClick: showHelpCommands,
              className: _styles2.default.link },
            _i18n2.default.getString('conferenceCommands', currentLocale)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.bottom },
          additionalButtons.map(function (Btn) {
            return _react2.default.createElement(Btn, {
              dialInNumber: dialInNumber,
              inviteText: _this2.inviteTxt(),
              key: Date.now()
            });
          }),
          _react2.default.createElement(
            _Button2.default,
            {
              className: _styles2.default.button,
              onClick: this.inviteWithText },
            _i18n2.default.getString('inviteWithText', currentLocale)
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              className: _styles2.default.primaryButton,
              onClick: function onClick() {
                return joinAsHost(dialInNumber);
              } },
            _i18n2.default.getString('joinAsHost', currentLocale)
          )
        )
      );
    }
  }]);
  return ConferencePanel;
}(_react.Component);

ConferencePanel.propTypes = {
  dialInNumbers: _propTypes2.default.array,
  dialInNumber: _propTypes2.default.string.isRequired,
  additionalNumbers: _propTypes2.default.array.isRequired,
  updateAdditionalNumbers: _propTypes2.default.func.isRequired,
  updateDialInNumber: _propTypes2.default.func.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  hostCode: _propTypes2.default.string.isRequired,
  participantCode: _propTypes2.default.string.isRequired,
  inviteWithText: _propTypes2.default.func.isRequired,
  joinAsHost: _propTypes2.default.func.isRequired,
  allowJoinBeforeHost: _propTypes2.default.bool.isRequired,
  onAllowJoinBeforeHostChange: _propTypes2.default.func.isRequired,
  additionalButtons: _propTypes2.default.array,
  showHelpCommands: _propTypes2.default.func.isRequired
};
ConferencePanel.defaultProps = {
  showSpinner: true,
  dialInNumbers: [],
  additionalButtons: []
};

exports.default = ConferencePanel;
//# sourceMappingURL=index.js.map
