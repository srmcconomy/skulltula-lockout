// @flow

declare module 'react-redux' {
  declare class ConnectedComponent<
    DefaultProps,
    OwnProps,
    StateProps,
    DispatchProps,
    State,
  > extends React$Component<
    void,
    OwnProps,
    void,
  > {
    static WrappedComponent: Class<React$Component<
      DefaultProps,
      OwnProps & StateProps & DispatchProps,
      State,
    >>;
    static defaultProps: void;
    getWrappedInstance(): React$Component<
      DefaultProps,
      OwnProps & StateProps & DispatchProps,
      State,
    >;
    props: OwnProps;
    state: void;
  }

  declare function connect<StoreState, OwnProps, StateProps, DispatchProps>(
    mapStateToProps?: (state: StoreState, ownProps: OwnProps) => StateProps,
    mapDispatchToProps?: DispatchProps,
  ): <DefaultProps, State>(
    component: Class<React$Component<
      DefaultProps,
      StateProps & DispatchProps,
      State,
    >>
  ) => Class<ConnectedComponent<
    DefaultProps,
    OwnProps,
    StateProps,
    DispatchProps,
    State
  >>;
}
