'use strict';

customElements.define(
    'compodoc-menu',
    class extends HTMLElement {
        constructor() {
            super();
            this.isNormalMode = this.getAttribute('mode') === 'normal';
        }

        connectedCallback() {
            this.render(this.isNormalMode);
        }

        render(isNormalMode) {
            let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">simbad-client documentation</a>
                </li>

                <li class="divider"></li>
                ${
                    isNormalMode
                        ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>`
                        : ''
                }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                            isNormalMode ? 'data-target="#additional-pages"' : 'data-target="#xs-additional-pages"'
                        }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                            isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"'
                        }>
                                    <li class="link ">
                                        <a href="additional-documentation/configuration-schema.html" data-type="entity-link" data-context-id="additional">Configuration schema</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${
                                isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AboutModule.html" data-type="entity-link">AboutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                            isNormalMode
                                                ? 'data-target="#components-links-module-AboutModule-4fbf1a22257171a84e508990ad421f5a"'
                                                : 'data-target="#xs-components-links-module-AboutModule-4fbf1a22257171a84e508990ad421f5a"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                            isNormalMode
                                                ? 'id="components-links-module-AboutModule-4fbf1a22257171a84e508990ad421f5a"'
                                                : 'id="xs-components-links-module-AboutModule-4fbf1a22257171a84e508990ad421f5a"'
                                        }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutRoutingModule.html" data-type="entity-link">AboutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                            isNormalMode
                                                ? 'data-target="#components-links-module-AppModule-f5d3e1664a9ed348e9e90b06877ca152"'
                                                : 'data-target="#xs-components-links-module-AppModule-f5d3e1664a9ed348e9e90b06877ca152"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                            isNormalMode
                                                ? 'id="components-links-module-AppModule-f5d3e1664a9ed348e9e90b06877ca152"'
                                                : 'id="xs-components-links-module-AppModule-f5d3e1664a9ed348e9e90b06877ca152"'
                                        }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExamplesModule.html" data-type="entity-link">ExamplesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                            isNormalMode
                                                ? 'data-target="#components-links-module-ExamplesModule-9aad19403ed599544d852c9268651283"'
                                                : 'data-target="#xs-components-links-module-ExamplesModule-9aad19403ed599544d852c9268651283"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                            isNormalMode
                                                ? 'id="components-links-module-ExamplesModule-9aad19403ed599544d852c9268651283"'
                                                : 'id="xs-components-links-module-ExamplesModule-9aad19403ed599544d852c9268651283"'
                                        }>
                                            <li class="link">
                                                <a href="components/AuthenticatedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthenticatedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChildComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChildComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComplexParameterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComplexParameterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfigurationStepComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfigurationStepComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateConfigurationDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateConfigurationDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExamplesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExamplesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimpleParameterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SimpleParameterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockMarketContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StockMarketContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TodosContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TodosContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                        isNormalMode
                                            ? 'data-target="#injectables-links-module-ExamplesModule-9aad19403ed599544d852c9268651283"'
                                            : 'data-target="#xs-injectables-links-module-ExamplesModule-9aad19403ed599544d852c9268651283"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                        isNormalMode
                                            ? 'id="injectables-links-module-ExamplesModule-9aad19403ed599544d852c9268651283"'
                                            : 'id="xs-injectables-links-module-ExamplesModule-9aad19403ed599544d852c9268651283"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/FormsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FormsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockMarketService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StockMarketService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExamplesRoutingModule.html" data-type="entity-link">ExamplesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeatureListModule.html" data-type="entity-link">FeatureListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                            isNormalMode
                                                ? 'data-target="#components-links-module-FeatureListModule-5b90c7503591d9342c8eb29ec8a770a8"'
                                                : 'data-target="#xs-components-links-module-FeatureListModule-5b90c7503591d9342c8eb29ec8a770a8"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                            isNormalMode
                                                ? 'id="components-links-module-FeatureListModule-5b90c7503591d9342c8eb29ec8a770a8"'
                                                : 'id="xs-components-links-module-FeatureListModule-5b90c7503591d9342c8eb29ec8a770a8"'
                                        }>
                                            <li class="link">
                                                <a href="components/FeatureListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatureListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeatureListRoutingModule.html" data-type="entity-link">FeatureListRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link">SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                            isNormalMode
                                                ? 'data-target="#components-links-module-SettingsModule-932263afe74cc2cddd49dd95bcfa3684"'
                                                : 'data-target="#xs-components-links-module-SettingsModule-932263afe74cc2cddd49dd95bcfa3684"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                            isNormalMode
                                                ? 'id="components-links-module-SettingsModule-932263afe74cc2cddd49dd95bcfa3684"'
                                                : 'id="xs-components-links-module-SettingsModule-932263afe74cc2cddd49dd95bcfa3684"'
                                        }>
                                            <li class="link">
                                                <a href="components/SettingsContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsRoutingModule.html" data-type="entity-link">SettingsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                            isNormalMode
                                                ? 'data-target="#components-links-module-SharedModule-037d5bae448f97afc205d8e53759afc1"'
                                                : 'data-target="#xs-components-links-module-SharedModule-037d5bae448f97afc205d8e53759afc1"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                            isNormalMode
                                                ? 'id="components-links-module-SharedModule-037d5bae448f97afc205d8e53759afc1"'
                                                : 'id="xs-components-links-module-SharedModule-037d5bae448f97afc205d8e53759afc1"'
                                        }>
                                            <li class="link">
                                                <a href="components/BigInputActionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BigInputActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BigInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BigInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                        isNormalMode
                                            ? 'data-target="#directives-links-module-SharedModule-037d5bae448f97afc205d8e53759afc1"'
                                            : 'data-target="#xs-directives-links-module-SharedModule-037d5bae448f97afc205d8e53759afc1"'
                                    }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                        isNormalMode
                                            ? 'id="directives-links-module-SharedModule-037d5bae448f97afc205d8e53759afc1"'
                                            : 'id="xs-directives-links-module-SharedModule-037d5bae448f97afc205d8e53759afc1"'
                                    }>
                                        <li class="link">
                                            <a href="directives/RtlSupportDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">RtlSupportDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                            isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'}>
                            <li class="link">
                                <a href="classes/ActionSettingsChangeAnimationsElements.html" data-type="entity-link">ActionSettingsChangeAnimationsElements</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionSettingsChangeAnimationsPage.html" data-type="entity-link">ActionSettingsChangeAnimationsPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionSettingsChangeAnimationsPageDisabled.html" data-type="entity-link">ActionSettingsChangeAnimationsPageDisabled</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionSettingsChangeAutoNightMode.html" data-type="entity-link">ActionSettingsChangeAutoNightMode</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionSettingsChangeHour.html" data-type="entity-link">ActionSettingsChangeHour</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionSettingsChangeLanguage.html" data-type="entity-link">ActionSettingsChangeLanguage</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionSettingsChangeStickyHeader.html" data-type="entity-link">ActionSettingsChangeStickyHeader</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionSettingsChangeTheme.html" data-type="entity-link">ActionSettingsChangeTheme</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${
                                isNormalMode
                                    ? 'data-target="#injectables-links"'
                                    : 'data-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${
                                isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'
                            }>
                                <li class="link">
                                    <a href="injectables/AnimationsService.html" data-type="entity-link">AnimationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppErrorHandler.html" data-type="entity-link">AppErrorHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link">AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BooksEffects.html" data-type="entity-link">BooksEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigurationSchemaProviderService.html" data-type="entity-link">ConfigurationSchemaProviderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomSerializer.html" data-type="entity-link">CustomSerializer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExamplesEffects.html" data-type="entity-link">ExamplesEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormEffects.html" data-type="entity-link">FormEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAnalyticsEffects.html" data-type="entity-link">GoogleAnalyticsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObjectsDefinitionsService.html" data-type="entity-link">ObjectsDefinitionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParameterNameUtilsService.html" data-type="entity-link">ParameterNameUtilsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsEffects.html" data-type="entity-link">SettingsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StockMarketEffects.html" data-type="entity-link">StockMarketEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TitleService.html" data-type="entity-link">TitleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TodosEffects.html" data-type="entity-link">TodosEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                            isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"'
                        }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                            isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"'
                        }>
                            <li class="link">
                                <a href="interceptors/HttpErrorInterceptor.html" data-type="entity-link">HttpErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                            isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"'
                        }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"'}>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                            isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"'
                        }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                            isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'
                        }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link">AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link">AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Book.html" data-type="entity-link">Book</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BookState.html" data-type="entity-link">BookState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExamplesState.html" data-type="entity-link">ExamplesState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Feature.html" data-type="entity-link">Feature</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Form.html" data-type="entity-link">Form</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormState.html" data-type="entity-link">FormState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParameterDefinition.html" data-type="entity-link">ParameterDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParameterTree.html" data-type="entity-link">ParameterTree</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParameterTreeNode.html" data-type="entity-link">ParameterTreeNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterStateUrl.html" data-type="entity-link">RouterStateUrl</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsState.html" data-type="entity-link">SettingsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-1.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Stock.html" data-type="entity-link">Stock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockMarketState.html" data-type="entity-link">StockMarketState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Todo.html" data-type="entity-link">Todo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TodosState.html" data-type="entity-link">TodosState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                            isNormalMode
                                ? 'data-target="#miscellaneous-links"'
                                : 'data-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                            isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'
                        }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
            this.innerHTML = tp.strings;
        }
    }
);
