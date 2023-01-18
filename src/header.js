import React, { useState } from 'react';

function Header({ onToggle }) {
    return (
        <>
            <div className="navbar header-full-width">
                <a className="toggle" onClick={onToggle}>
                    <span></span>
                </a>
                <h1 className="navbar-brand">
                    <a className="brand" >
                        <h3>DILLINGER</h3>
                    </a>
                </h1>
                <div className="ad-container">
                </div>
                <nav className="nav nav-right">
                    <ul className="menu menu-utilities">
                        <li className="menu-item menu-item--export-as has-dropdown" dropdown="">
                            <a className="dropdown-toggle" dropdown-toggle="" aria-haspopup="true" aria-expanded="false">Preview as <span className="caret"></span></a>
                            <ul className="dropdown dropdown-menu ng-scope" role="menu" ng-controller="DocumentsExport as export" di-target="preview">
                                <li>
                                    <a ng-click="export.asHTML()" className="export-html">HTML</a>
                                </li>
                                <li>
                                    <a ng-click="export.asStyledHTML()" className="export-styled_html">Styled HTML</a>
                                </li>
                                <li>
                                    <a ng-click="export.asMarkdown()" className="export-md">Markdown</a>
                                </li>
                                <li>
                                    <a ng-click="export.asPDF()" className="export-pdf">PDF</a>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item menu-item--export-as has-dropdown" dropdown="">
                            <a className="dropdown-toggle" dropdown-toggle="" aria-haspopup="true" aria-expanded="false">Export as <span className="caret"></span></a>
                            <ul className="dropdown dropdown-menu ng-scope" role="menu" ng-controller="DocumentsExport as export" di-target="_top">
                                <li>
                                    <a ng-click="export.asHTML()" className="export-html">HTML</a>
                                </li>
                                <li>
                                    <a ng-click="export.asStyledHTML()" className="export-styled_html">Styled HTML</a>
                                </li>
                                <li>
                                    <a ng-click="export.asMarkdown()" className="export-md">Markdown</a>
                                </li>
                                <li>
                                    <a ng-click="export.asPDF()" className="export-pdf">PDF</a>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item menu-item--save-to has-dropdown" dropdown="">
                            <a className="dropdown-toggle" dropdown-toggle="" aria-haspopup="true" aria-expanded="false">Save to <span className="caret"></span></a>
                            <ul className="dropdown dropdown-menu" role="menu">
                                <li ng-controller="Dropbox as dropbox" className="ng-scope">
                                    <a href="/redirect/dropbox" className="import-dropbox unlinked">
                                        <span>Dropbox</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>

                                <li ng-controller="Github as github" className="ng-scope">
                                    <a className="import-github unlinked" ng-click="github.chooseScope()">
                                        <span>Github</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                                <li ng-controller="Medium as medium" className="ng-scope">
                                    <a href="/redirect/medium" className="import-medium unlinked">
                                        <span>Medium</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                                <li ng-controller="Googledrive as googledrive" className="ng-scope">
                                    <a href="/redirect/googledrive" className="import-google-drive unlinked">
                                        <span>Google Drive</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                                <li ng-controller="Onedrive as onedrive" className="ng-scope">
                                    <a href="/redirect/onedrive" className="import-one-drive unlinked">
                                        <span>One Drive</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item menu-item--import-from has-dropdown" dropdown="">
                            <a className="dropdown-toggle" dropdown-toggle="" aria-haspopup="true" aria-expanded="false">Import from <span className="caret"></span></a>
                            <ul className="dropdown dropdown-menu" role="menu">
                                <li ng-controller="Dropbox as dropbox" className="ng-scope">
                                    <a href="/redirect/dropbox" className="import-dropbox unlinked">
                                        <span>Dropbox</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                                <li ng-controller="Bitbucket as bitbucket" className="ng-scope">
                                    <a className="import-bitbucket unlinked" href="/redirect/bitbucket">
                                        <span>Bitbucket</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                                <li ng-controller="Github as github" className="ng-scope">
                                    <a className="import-github unlinked" ng-click="github.chooseScope()">
                                        <span>Github</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                                <li ng-controller="Googledrive as googledrive" className="ng-scope">
                                    <a href="/redirect/googledrive" className="import-google-drive unlinked">
                                        <span>Google Drive</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                                <li ng-controller="Onedrive as onedrive" className="ng-scope">
                                    <a href="/redirect/onedrive" className="import-one-drive unlinked">
                                        <span>One Drive</span>
                                        <span className="icon icon-link">
                                        </span>
                                    </a>
                                </li>
                                <li ng-controller="ImportFile as importFile" className="ng-scope">
                                    <a className="linked" ng-click="choose()">
                                        <span>Markdown File</span>
                                    </a>
                                </li>
                                <li ng-controller="ImportFile as importFile" className="ng-scope">
                                    <a className="linked" ng-click="choose('html')">
                                        <span>HTML File</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item menu-item-icon menu-item--preview">
                            <a className="menu-link menu-link-preview" preview-toggle="">
                                <i className="icon icon-preview">
                                </i>
                                <span className="sr-only">Preview</span>
                            </a>
                        </li>
                        <li className="menu-item menu-item-icon menu-item--settings">
                            <a className="menu-link menu-link-settings" settings-toggle="">
                                <i className="icon icon-settings">
                                </i>
                                <span className="sr-only">Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Header;