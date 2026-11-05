START TRANSACTION;

/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `pbc-backend`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_content`
--

CREATE TABLE `demodoc__doc_content` (
  `ID` int UNSIGNED NOT NULL,
  `ModID` int UNSIGNED NOT NULL,
  `PageId` int UNSIGNED NOT NULL,
  `Row` smallint UNSIGNED NOT NULL DEFAULT '0',
  `Placeholder` varchar(30) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Entry` mediumtext COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Filter` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastUpdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `demodoc__doc_content`
--

INSERT INTO `demodoc__doc_content` (`ID`, `ModID`, `PageId`, `Row`, `Placeholder`, `Entry`, `Filter`, `LastUpdate`) VALUES
(1, 1, 1, 0, 'keywords', 'Einführung Seitenerstellung', '', '2026-08-10 15:08:42'),
(2, 1, 1, 0, 'maintext', '## Erste Schritte\n\nAuf der Seite Test-Doku-Editor können Sie \n- neue Artikel erstellen\n- bestehende Artikel umbenennen\n- Artikel aus der Navigation löschen\n\nMit rechtem Mausklick auf einen Menüpunkt öffnet sich ein Untermenü.\n\n%%4%%\n\nIm Formular erstellen wir die Texte mit **Markdown**.  \nBilder und Code-Abschnitte können über die Buttons eingefügt werden.\nEs wird dann ein Stellvertretercode mit einer Zahl jeweils zwei Prozentzeichen vorn und hintern eingefügt. Dieser wird bei der Darstellung durch das Bild oder den Code ersetzt. \n\n%%6%%\n\nDer **Bild-Upload** ist mit Klick auf den entsprechend betitelten Reiter über der Doku-Navigation erreichbar.  \n\nDas gewünschte Bild muss nach dem Upload markiert werden (Radio-Button). Mit dem Reiter **Texte** gelangt man wieder in die Formularansicht.', 'md', '2026-08-14 13:53:07'),
(3, 1, 1, 0, 'teaser', 'Erste Schritte im Dokusystem', '', '2026-08-10 15:08:09'),
(16, 1, 2, 0, 'keywords', 'Testseite, Versuch, Ausprobieren', '', '2026-07-07 14:11:40'),
(17, 1, 2, 0, 'maintext', 'Dies ist eine Unterseite zum Überblick', 'md', '2026-07-07 14:11:40'),
(18, 1, 2, 0, 'teaser', 'Test einer Unterseite', '', '2026-07-07 14:11:40'),
(43, 1, 3, 0, 'keywords', 'Unterseite', '', '2026-07-15 14:40:05'),
(44, 1, 3, 0, 'maintext', '# Überschrift (h1)\n\nHamburg ist immer eine Reise wert.\n\n%%6%%', 'md', '2026-08-14 13:51:07'),
(45, 1, 3, 0, 'teaser', 'Unterseite1', '', '2026-07-15 14:40:05');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_content_inline`
--

CREATE TABLE `demodoc__doc_content_inline` (
  `ID` int UNSIGNED NOT NULL,
  `ElementId` int UNSIGNED NOT NULL,
  `Placeholder` varchar(50) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Entry` mediumtext COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Filter` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `demodoc__doc_content_inline`
--

INSERT INTO `demodoc__doc_content_inline` (`ID`, `ElementId`, `Placeholder`, `Entry`, `Filter`) VALUES
(1, 2, 'image_id', '1', 'add_imgdata'),
(2, 3, 'image_id', '1', 'add_imgdata'),
(3, 4, 'image_id', '2', 'add_imgdata'),
(4, 5, 'code', 'abc', 'specialchars'),
(5, 6, 'image_id', '3', 'add_imgdata');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_images_dest`
--

CREATE TABLE `demodoc__doc_images_dest` (
  `ID` int UNSIGNED NOT NULL,
  `ModID` int UNSIGNED NOT NULL DEFAULT '0',
  `PageId` int UNSIGNED NOT NULL DEFAULT '0',
  `ImageNr` int UNSIGNED NOT NULL DEFAULT '0',
  `Row` smallint UNSIGNED NOT NULL DEFAULT '0',
  `ImageID` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_images_index`
--

CREATE TABLE `demodoc__doc_images_index` (
  `ID` int UNSIGNED NOT NULL,
  `ParentID` int UNSIGNED NOT NULL DEFAULT '0',
  `ImgFile` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ImgPath` varchar(200) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ImgW` smallint UNSIGNED NOT NULL,
  `ImgH` smallint NOT NULL,
  `ImgAlt` varchar(50) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `ImgDescr` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CrDate` date NOT NULL DEFAULT '0000-00-00',
  `Location` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Author` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UID` int UNSIGNED NOT NULL DEFAULT '0',
  `Comment` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UploadFileName` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `demodoc__doc_images_index`
--

INSERT INTO `demodoc__doc_images_index` (`ID`, `ParentID`, `ImgFile`, `ImgPath`, `ImgW`, `ImgH`, `ImgAlt`, `ImgDescr`, `CrDate`, `Location`, `Updated`, `Author`, `UID`, `Comment`, `UploadFileName`) VALUES
(2, 0, 'pbcdoc_article_creation.jpg', '/', 800, 343, '', 'So wird ein neuer Artikel in die Doku eingefüg', '2026-08-07', '', '2026-08-07 09:57:06', 'Screenshot', 0, '', '20260807115541_pbcdoc_article_creation.jpg'),
(3, 0, 'hamburg-alster-pbc.jpg', '/', 600, 488, '', 'Hamburg - Alstermotiv', '2026-07-10', 'Hamburg', '2026-08-14 13:50:14', 'Peter Bieling', 0, '', '20260814154606_hamburg-alster-pbc.jpg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_index`
--

CREATE TABLE `demodoc__doc_index` (
  `ID` int UNSIGNED NOT NULL,
  `ParentID` int UNSIGNED NOT NULL DEFAULT '0',
  `ModID` smallint UNSIGNED NOT NULL DEFAULT '1',
  `GrID` smallint UNSIGNED NOT NULL DEFAULT '0',
  `Label` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `URL` varchar(200) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `HelpID` varchar(10) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Ord` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `Hide` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `NoPage` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `LastUpdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `demodoc__doc_index`
--

INSERT INTO `demodoc__doc_index` (`ID`, `ParentID`, `ModID`, `GrID`, `Label`, `URL`, `HelpID`, `Ord`, `Hide`, `NoPage`, `LastUpdate`) VALUES
(1, 0, 1, 0, 'Überblick', 'index', '', 0, 0, 0, '2018-01-11 16:25:19'),
(2, 1, 1, 0, 'Testseite 1', 'testseite-1', '', 0, 0, 0, '2026-07-07 14:10:34'),
(3, 2, 1, 0, 'Unterseite 1', 'unterseite-1', '', 0, 0, 0, '2026-07-15 14:40:37');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_index_inline`
--

CREATE TABLE `demodoc__doc_index_inline` (
  `ElementId` int UNSIGNED NOT NULL,
  `TemplateId` int UNSIGNED NOT NULL DEFAULT '0',
  `ElementType` varchar(20) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ReplaceList` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `demodoc__doc_index_inline`
--

INSERT INTO `demodoc__doc_index_inline` (`ElementId`, `TemplateId`, `ElementType`, `ReplaceList`) VALUES
(1, 16, 'image_standard', 'image_id'),
(2, 16, 'image_standard', 'image_id'),
(3, 15, 'image_description_fl', 'image_id'),
(4, 16, 'image_standard', 'image_id'),
(5, 2, 'code_php', 'code'),
(6, 12, 'image_description_fl', 'image_id');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_modules`
--

CREATE TABLE `demodoc__doc_modules` (
  `ModID` int UNSIGNED NOT NULL,
  `TplID` int UNSIGNED NOT NULL DEFAULT '0',
  `Position` varchar(20) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Info` varchar(200) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Flags` varchar(200) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Hide` tinyint UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `demodoc__doc_modules`
--

INSERT INTO `demodoc__doc_modules` (`ModID`, `TplID`, `Position`, `Info`, `Flags`, `Hide`) VALUES
(1, 1, 'outer', 'Äußerstes Template', 'ONCE', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_structure`
--

CREATE TABLE `demodoc__doc_structure` (
  `ID` int UNSIGNED NOT NULL,
  `ModID` int UNSIGNED NOT NULL DEFAULT '0',
  `Groups` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Pages` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `TplType` varchar(20) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DataSource` varchar(40) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Fields` mediumtext COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `SourceName` varchar(40) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Param` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Ord` smallint UNSIGNED NOT NULL DEFAULT '0',
  `Hide` tinyint UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `demodoc__doc_structure`
--

INSERT INTO `demodoc__doc_structure` (`ID`, `ModID`, `Groups`, `Pages`, `TplType`, `DataSource`, `Fields`, `SourceName`, `Param`, `Ord`, `Hide`) VALUES
(1, 1, '', '', '', 'entries', 'teaser,maintext,keywords', '', '', 0, 0),
(2, 1, '', '', '', 'project_class', 'prevnext_navi', '\\PbClasses\\MDoc\\PrevNextNavi', 'doc', 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_templates`
--

CREATE TABLE `demodoc__doc_templates` (
  `ID` int UNSIGNED NOT NULL,
  `FileName` varchar(60) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `TplName` varchar(60) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `TplType` varchar(15) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Label` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Ord` smallint UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `demodoc__doc_templates`
--

INSERT INTO `demodoc__doc_templates` (`ID`, `FileName`, `TplName`, `TplType`, `Label`, `Ord`) VALUES
(1, 'outer_doc.tpl', 'main', 'main', 'Haupttemplate für die Dokumentation', 0),
(2, 'code.tpl', 'code_php', 'InlineTpl', 'Inline-Template - Code', 0),
(3, 'code.tpl', 'code_html', 'InlineTpl', 'Inline-Template - Code', 0),
(4, 'code.tpl', 'code_pbtpl', 'InlineTpl', 'Inline-Template - Code', 0),
(5, 'code.tpl', 'code_css', 'InlineTpl', 'Inline-Template - Code', 0),
(6, 'video.tpl', 'video_subtitle', 'InlineTpl', 'Video mit Untertiteln', 0),
(7, 'code.tpl', 'code_javascript', 'InlineTpl', 'Inline-Template - Code', 0),
(8, 'code.tpl', 'code_xml', 'InlineTpl', 'Inline-Template - Code XML', 0),
(9, 'code.tpl', 'code_sql', 'InlineTpl', 'Inline-Template - Code SQL', 0),
(10, 'image.tpl', 'image_author_floatleft', 'InlineTpl', 'Inline-Template - Bild mit Autor', 0),
(11, 'image.tpl', 'image_author_description_floatleft', 'InlineTpl', 'Inline-Template - Bild mit Autor und Beschreibung', 0),
(12, 'image.tpl', 'image_description_floatleft', 'InlineTpl', 'Inline-Template - Bild mit Beschreibung', 0),
(13, 'image.tpl', 'image_author_floatright', 'InlineTpl', 'Inline-Template - Bild mit Autor', 0),
(14, 'image.tpl', 'image_author_description_floatright', 'InlineTpl', 'Inline-Template - Bild mit Autor und Beschreibung', 0),
(15, 'image.tpl', 'image_description_floatright', 'InlineTpl', 'Inline-Template - Bild mit Beschreibung', 0),
(16, 'image.tpl', 'image_standard', 'InlineTpl', 'Inline-Template - Bild Standard', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `demodoc__doc_tokens`
--

CREATE TABLE `demodoc__doc_tokens` (
  `Token` varchar(10) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DE` varchar(50) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `EN` varchar(50) COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbcdemo_events`
--

CREATE TABLE `pbcdemo_events` (
  `ID` int NOT NULL,
  `EvIndex` int UNSIGNED NOT NULL DEFAULT '0',
  `EvName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `EvComment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Ord` int UNSIGNED NOT NULL DEFAULT '0',
  `Hide` tinyint(1) NOT NULL DEFAULT '0',
  `CrTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbcdemo_events`
--

INSERT INTO `pbcdemo_events` (`ID`, `EvIndex`, `EvName`, `EvComment`, `Ord`, `Hide`, `CrTime`) VALUES
(1, 101, 'Treffen', 'allgemein', 2, 0, '2026-07-07 10:02:13'),
(2, 1, 'Kontemplation', '', 5, 0, '2025-10-28 12:41:13'),
(3, 2, 'Gymnastik', '', 6, 0, '2025-10-28 12:41:13'),
(4, 3, 'Nett zusammensitzen', '', 7, 0, '2025-10-28 12:41:13'),
(5, 4, 'Diskussion', '', 8, 0, '2025-10-28 12:41:13'),
(6, 5, 'Frauenhilfe', '', 9, 0, '2025-10-28 12:41:13'),
(7, 6, 'Seniorenclub', '', 3, 0, '2026-04-27 10:29:58'),
(8, 100, 'Familienfeier', '', 4, 0, '2026-04-27 10:29:59'),
(9, 105, 'Jetzt kocht Papa', '', 1, 0, '2026-04-27 10:29:58');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbcdemo_organisation`
--

CREATE TABLE `pbcdemo_organisation` (
  `ID` int NOT NULL,
  `OrgIndex` int UNSIGNED NOT NULL DEFAULT '0',
  `OrgName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `DefComment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Ord` int UNSIGNED NOT NULL DEFAULT '0',
  `Hide` tinyint(1) NOT NULL DEFAULT '0',
  `CrTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbcdemo_organisation`
--

INSERT INTO `pbcdemo_organisation` (`ID`, `OrgIndex`, `OrgName`, `DefComment`, `Ord`, `Hide`, `CrTime`) VALUES
(1, 1, 'Privat', '', 3, 0, '2026-07-07 10:01:56'),
(3, 2, 'Seniorenhilfe', '', 1, 0, '2026-01-28 14:15:14'),
(4, 4, 'Silvercoder', '', 4, 0, '2026-07-07 10:01:56'),
(5, 3, 'Fit & Co.', '', 5, 0, '2025-11-02 17:42:28'),
(7, 0, 'Nachbarschaftsverein', 'Kein Kommentar', 2, 0, '2026-07-07 10:01:56'),
(8, 5, 'Kochlöffel e.V.', '', 6, 0, '2025-10-08 10:24:35');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbcdemo_wochenplan`
--

CREATE TABLE `pbcdemo_wochenplan` (
  `ID` int NOT NULL,
  `WdIndex` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `ZeitVon` time NOT NULL DEFAULT '00:00:00',
  `ZeitBis` time NOT NULL DEFAULT '00:00:00',
  `OrgIndex` int UNSIGNED NOT NULL DEFAULT '0',
  `EventIndex` int UNSIGNED NOT NULL DEFAULT '0',
  `Leitung` varchar(50) NOT NULL DEFAULT '',
  `Raum1` enum('0','1') NOT NULL DEFAULT '1',
  `Raum2` enum('0','1') NOT NULL DEFAULT '0',
  `Kommentar` text NOT NULL,
  `LastUpdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbcdemo_wochenplan`
--

INSERT INTO `pbcdemo_wochenplan` (`ID`, `WdIndex`, `ZeitVon`, `ZeitBis`, `OrgIndex`, `EventIndex`, `Leitung`, `Raum1`, `Raum2`, `Kommentar`, `LastUpdate`) VALUES
(3, 3, '15:00:00', '17:00:00', 2, 2, 'Frau Müller', '1', '0', 'Nicht am 1. Mi im Monat', '2026-06-11 14:04:18'),
(4, 2, '19:00:00', '21:30:00', 1, 0, 'Herr Meier', '1', '1', 'abcde', '2026-06-29 08:20:58'),
(5, 5, '08:30:00', '09:30:00', 1, 2, 'Herr Lehmann', '0', '1', '', '2025-10-06 07:24:02'),
(6, 4, '19:00:00', '21:00:00', 3, 1, 'Herr Schulze', '1', '0', '', '2025-10-08 06:27:52'),
(7, 4, '08:00:00', '12:00:00', 1, 2, 'Frau Schulz', '0', '1', '', '2025-10-28 10:38:11'),
(8, 3, '15:00:00', '17:00:00', 2, 5, 'Frau Herrmann', '0', '1', '1. Mittwoch im Monat', '2025-10-28 10:36:21'),
(9, 5, '10:00:00', '11:30:00', 5, 105, 'Herr Koch', '1', '0', '', '2026-08-07 09:28:24'),
(10, 4, '15:00:00', '17:00:00', 2, 6, 'Frau Müller', '1', '0', '1. Donnerstag im Monat', '2025-10-28 15:41:53'),
(11, 1, '16:00:00', '18:00:00', 0, 4, 'Frau Walter', '0', '1', 'Dies ist ein  abc ddd', '2026-07-07 08:01:38'),
(12, 6, '00:00:00', '01:00:00', 3, 3, 'abcde', '1', '0', '', '2026-04-23 08:22:18');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__access_groups`
--

CREATE TABLE `pbc__access_groups` (
  `GID` smallint UNSIGNED NOT NULL COMMENT 'Gruppen ID',
  `GKey` varchar(32) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Gruppenname',
  `GLabel` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Gruppenbeschreibung',
  `CrBy` int UNSIGNED NOT NULL COMMENT 'Erstellt von',
  `CrDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Erstellt am',
  `Ord` int NOT NULL DEFAULT '0',
  `Hide` tinyint UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Verstecken'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbc__access_groups`
--

INSERT INTO `pbc__access_groups` (`GID`, `GKey`, `GLabel`, `CrBy`, `CrDate`, `Ord`, `Hide`) VALUES
(1, 'admin', 'Admin', 1, '2026-09-08 09:39:28', 0, 0),
(2, 'editors', 'Editors', 1, '2026-09-07 10:02:35', 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__access_page2groups`
--

CREATE TABLE `pbc__access_page2groups` (
  `PID` smallint UNSIGNED NOT NULL COMMENT 'Page ID',
  `GID` smallint UNSIGNED NOT NULL COMMENT 'Gruppen ID',
  `CrBy` smallint UNSIGNED NOT NULL COMMENT 'Erstellt von',
  `CrDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Erstellt am',
  `Hide` tinyint UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Verstecken'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbc__access_page2groups`
--

INSERT INTO `pbc__access_page2groups` (`PID`, `GID`, `CrBy`, `CrDate`, `Hide`) VALUES
(3, 1, 1, '2026-05-27 12:37:09', 0),
(5, 1, 1, '2025-10-02 10:29:20', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__access_page2user`
--

CREATE TABLE `pbc__access_page2user` (
  `PID` smallint UNSIGNED NOT NULL COMMENT 'Page ID',
  `UID` smallint UNSIGNED NOT NULL COMMENT 'User-ID',
  `Forbidden` tinyint NOT NULL DEFAULT '0',
  `CrBy` smallint UNSIGNED NOT NULL COMMENT 'Erstellt von',
  `CrDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Erstellt am',
  `Hide` tinyint UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Verstecken'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__access_user2groups`
--

CREATE TABLE `pbc__access_user2groups` (
  `UID` smallint UNSIGNED NOT NULL COMMENT 'Mitarbeiter',
  `GID` smallint UNSIGNED NOT NULL COMMENT 'Gruppe',
  `CrBy` smallint UNSIGNED NOT NULL COMMENT 'Erstellt von',
  `CrDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Erstellt am',
  `Hide` tinyint UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Verstecken'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbc__access_user2groups`
--

INSERT INTO `pbc__access_user2groups` (`UID`, `GID`, `CrBy`, `CrDate`, `Hide`) VALUES
(1, 1, 1, '2025-02-13 15:02:14', 0),
(2, 2, 1, '2025-10-02 12:04:48', 0),
(4, 2, 1, '2025-10-02 12:04:48', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__backnavi`
--

CREATE TABLE `pbc__backnavi` (
  `ID` int UNSIGNED NOT NULL,
  `ParentID` int UNSIGNED NOT NULL DEFAULT '0',
  `Label` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `URL` varchar(200) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `AltTpl` varchar(50) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `HelpID` varchar(10) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Ord` smallint UNSIGNED NOT NULL DEFAULT '0',
  `Hide` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `NoPage` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `AccLevel` tinyint UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbc__backnavi`
--

INSERT INTO `pbc__backnavi` (`ID`, `ParentID`, `Label`, `URL`, `AltTpl`, `HelpID`, `Ord`, `Hide`, `NoPage`, `AccLevel`) VALUES
(1, 0, 'Übersicht', 'index.php', '', '', 0, 0, 0, 0),
(2, 0, 'Master', 'master/index.php', '', '', 1, 0, 1, 3),
(3, 2, 'Task-Tabelle', 'admin/task-table.php', '', '', 4, 0, 0, 3),
(4, 2, 'User-Verwaltung', 'master/edit-user.php', '', '', 1, 0, 0, 3),
(5, 2, 'Seitenverwaltung', 'master/page-creator.php', '', '', 0, 0, 0, 3),
(6, 0, 'Demos', 'demos.php', '', '', 2, 0, 1, 0),
(7, 6, 'Test-Doku', 'demos/test-doku.php', '', '', 0, 0, 0, 0),
(8, 6, 'Test-Doku-Editor', 'demos/test-doku-editor.php', '', '', 1, 0, 0, 0),
(9, 6, 'Tabellen-Demo', 'demos/table-demo.php', '', '', 2, 0, 0, 0),
(10, 6, 'PDF-Demo: Marmelade', 'testbereich/pdf/marmelade.php', '', '', 3, 0, 0, 0),
(11, 6, 'PDF-Demo: Brief', 'testbereich/pdf/letter1.php', '', '', 4, 0, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__groupuser`
--

CREATE TABLE `pbc__groupuser` (
  `UID` smallint UNSIGNED NOT NULL,
  `Uname` varchar(20) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `GroupName` varchar(30) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Passw` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `RealName` varchar(40) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `CrDate` datetime NOT NULL,
  `Frg` enum('0','1','2','3') COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `ON_OFF` tinyint UNSIGNED NOT NULL DEFAULT '1',
  `LastUpdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__navigation_translation`
--

CREATE TABLE `pbc__navigation_translation` (
  `Id` int NOT NULL,
  `NavigationId` int UNSIGNED NOT NULL DEFAULT '0',
  `Language` varchar(10) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Entry` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbc__navigation_translation`
--

INSERT INTO `pbc__navigation_translation` (`Id`, `NavigationId`, `Language`, `Entry`) VALUES
(6, 6, 'en', 'Demos'),
(2, 2, 'en', 'Master'),
(1, 1, 'en', 'Overview'),
(5, 5, 'en', 'Page management'),
(10, 10, 'en', 'PDF demo - jam'),
(9, 9, 'en', 'Table demo'),
(3, 3, 'en', 'Task table'),
(7, 7, 'en', 'Test docs'),
(8, 8, 'en', 'Test docs editor'),
(4, 4, 'en', 'User management'),
(12, 2, 'el', 'Διαχείριση'),
(14, 5, 'el', 'Διαχείριση σελίδων'),
(20, 4, 'el', 'Διαχείριση χρηστών'),
(18, 7, 'el', 'Δοκιμαστικά έγγραφα'),
(19, 8, 'el', 'Επεξεργαστής δοκιμαστικών εγγράφων'),
(13, 1, 'el', 'Επισκόπηση'),
(15, 10, 'el', 'Παράδειγμα PDF - μαρμελάδα'),
(16, 9, 'el', 'Παράδειγμα πινάκων'),
(11, 6, 'el', 'Παραδείγματα'),
(17, 3, 'el', 'Πίνακας εργασιών');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__online`
--

CREATE TABLE `pbc__online` (
  `SID` varchar(50) NOT NULL DEFAULT '',
  `UID` int UNSIGNED NOT NULL DEFAULT '0',
  `IP` varchar(30) NOT NULL DEFAULT '',
  `Zeit` int UNSIGNED NOT NULL DEFAULT '0',
  `PageID` smallint UNSIGNED NOT NULL DEFAULT '0',
  `Ordernr` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `pbc__online`
--

INSERT INTO `pbc__online` (`SID`, `UID`, `IP`, `Zeit`, `PageID`, `Ordernr`) VALUES
('dc91cd1fb74996b2b290d2c1a8831af5', 1, '192.168.178.61', 1792316268, 11, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbc__user`
--

CREATE TABLE `pbc__user` (
  `UID` smallint UNSIGNED NOT NULL,
  `Uname` varchar(20) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Passw` varchar(100) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `RealName` varchar(40) COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `CrDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Frg` enum('0','1','2','3') COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `ON_OFF` tinyint UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbc__user`
--

INSERT INTO `pbc__user` (`UID`, `Uname`, `Passw`, `RealName`, `CrDate`, `Frg`, `ON_OFF`) VALUES
(1, 'admin', '$2y$12$W.6rVnvDlMtphhZU.tcsJurBNlcR1srjiALd5.2/NHEXez3a5dbQq', 'Admin', '2026-08-29 15:34:46', '3', 1),
(2, 'kunz', '$2y$10$kkaNgUIWtu.bmrrhXrgzq.yCvDSlPlH35x5MOq7vCCo8Rf4G4NUW.', 'Kunz Hinzmann', '2026-08-29 15:23:35', '0', 1),
(3, 'hinz', '$2y$10$W1d/EyXTOOZLnWyR0pbw5edGlbsyoZOw2aZ9bmISUkhioIAoSUShG', 'Hinz Kunzmann', '2026-09-22 09:42:36', '2', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbtask__tasks_list1`
--

CREATE TABLE `pbtask__tasks_list1` (
  `ID` int UNSIGNED NOT NULL,
  `Description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `TaskClass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `Minutes` int NOT NULL DEFAULT '1440',
  `Nextrun` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `LastStart` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Status` enum('ON','OFF','RUNNING','ERROR','STOP') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'OFF',
  `Finished` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Heartbeat` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Fingerprint` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbtask__tasks_list1`
--

INSERT INTO `pbtask__tasks_list1` (`ID`, `Description`, `TaskClass`, `Minutes`, `Nextrun`, `LastStart`, `Status`, `Finished`, `Heartbeat`, `Fingerprint`) VALUES
(1, 'Erster Test', 'ErsterTest', 10, '2025-09-03 16:40:22', '2025-09-03 16:35:22', 'OFF', '2025-09-03 16:37:02', '2025-09-03 16:35:22', ''),
(2, 'Zweiter Test', 'ZweiterTest', 4, '2026-05-27 17:42:30', '2026-05-27 17:38:30', 'STOP', '2025-09-03 16:36:52', '2026-05-27 17:38:30', 'b3d7270fe4775ac6544a9df0628107ee'),
(3, 'Dritter Test', 'DritterTest', 10, '2026-05-27 17:48:30', '2026-05-27 17:38:30', 'ON', '2026-05-27 17:41:51', '2026-05-27 17:38:30', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pbtask__tasks_meta`
--

CREATE TABLE `pbtask__tasks_meta` (
  `ID` int NOT NULL,
  `TaskTable` varchar(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `RunningMode` enum('normal','debug','off') NOT NULL DEFAULT 'off',
  `LastRun` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `RunningStatus` tinyint UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `pbtask__tasks_meta`
--

INSERT INTO `pbtask__tasks_meta` (`ID`, `TaskTable`, `Description`, `RunningMode`, `LastRun`, `RunningStatus`) VALUES
(1, 'pbtask__tasks_list1', 'Haupt-Tasks', 'normal', '2026-05-27 15:42:30', 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `demodoc__doc_content`
--
ALTER TABLE `demodoc__doc_content`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `entrykeys` (`ModID`,`PageId`,`Row`,`Placeholder`);

--
-- Indizes für die Tabelle `demodoc__doc_content_inline`
--
ALTER TABLE `demodoc__doc_content_inline`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `u1` (`ElementId`,`Placeholder`);

--
-- Indizes für die Tabelle `demodoc__doc_images_dest`
--
ALTER TABLE `demodoc__doc_images_dest`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `demodoc__doc_images_index`
--
ALTER TABLE `demodoc__doc_images_index`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `demodoc__doc_index`
--
ALTER TABLE `demodoc__doc_index`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `demodoc__doc_index_inline`
--
ALTER TABLE `demodoc__doc_index_inline`
  ADD PRIMARY KEY (`ElementId`);

--
-- Indizes für die Tabelle `demodoc__doc_modules`
--
ALTER TABLE `demodoc__doc_modules`
  ADD PRIMARY KEY (`ModID`);

--
-- Indizes für die Tabelle `demodoc__doc_structure`
--
ALTER TABLE `demodoc__doc_structure`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `demodoc__doc_templates`
--
ALTER TABLE `demodoc__doc_templates`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ft` (`FileName`,`TplName`);

--
-- Indizes für die Tabelle `demodoc__doc_tokens`
--
ALTER TABLE `demodoc__doc_tokens`
  ADD PRIMARY KEY (`Token`);

--
-- Indizes für die Tabelle `pbcdemo_events`
--
ALTER TABLE `pbcdemo_events`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `pbcdemo_organisation`
--
ALTER TABLE `pbcdemo_organisation`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `confkey` (`OrgIndex`);

--
-- Indizes für die Tabelle `pbcdemo_wochenplan`
--
ALTER TABLE `pbcdemo_wochenplan`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `pbc__access_groups`
--
ALTER TABLE `pbc__access_groups`
  ADD PRIMARY KEY (`GID`),
  ADD UNIQUE KEY `GKey` (`GKey`);

--
-- Indizes für die Tabelle `pbc__access_page2groups`
--
ALTER TABLE `pbc__access_page2groups`
  ADD UNIQUE KEY `PID` (`PID`,`GID`);

--
-- Indizes für die Tabelle `pbc__access_page2user`
--
ALTER TABLE `pbc__access_page2user`
  ADD UNIQUE KEY `PID` (`PID`,`UID`) USING BTREE;

--
-- Indizes für die Tabelle `pbc__access_user2groups`
--
ALTER TABLE `pbc__access_user2groups`
  ADD UNIQUE KEY `UID` (`UID`,`GID`);

--
-- Indizes für die Tabelle `pbc__backnavi`
--
ALTER TABLE `pbc__backnavi`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `pbc__groupuser`
--
ALTER TABLE `pbc__groupuser`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `username` (`Uname`,`GroupName`);

--
-- Indizes für die Tabelle `pbc__navigation_translation`
--
ALTER TABLE `pbc__navigation_translation`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `u_entry` (`Entry`,`NavigationId`,`Language`);

--
-- Indizes für die Tabelle `pbc__online`
--
ALTER TABLE `pbc__online`
  ADD PRIMARY KEY (`SID`),
  ADD UNIQUE KEY `i1` (`UID`,`IP`);

--
-- Indizes für die Tabelle `pbc__user`
--
ALTER TABLE `pbc__user`
  ADD PRIMARY KEY (`UID`);

--
-- Indizes für die Tabelle `pbtask__tasks_list1`
--
ALTER TABLE `pbtask__tasks_list1`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `pbtask__tasks_meta`
--
ALTER TABLE `pbtask__tasks_meta`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TaskTable` (`TaskTable`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_content`
--
ALTER TABLE `demodoc__doc_content`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_content_inline`
--
ALTER TABLE `demodoc__doc_content_inline`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_images_dest`
--
ALTER TABLE `demodoc__doc_images_dest`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_images_index`
--
ALTER TABLE `demodoc__doc_images_index`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_index`
--
ALTER TABLE `demodoc__doc_index`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_index_inline`
--
ALTER TABLE `demodoc__doc_index_inline`
  MODIFY `ElementId` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_modules`
--
ALTER TABLE `demodoc__doc_modules`
  MODIFY `ModID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_structure`
--
ALTER TABLE `demodoc__doc_structure`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `demodoc__doc_templates`
--
ALTER TABLE `demodoc__doc_templates`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT für Tabelle `pbcdemo_events`
--
ALTER TABLE `pbcdemo_events`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT für Tabelle `pbcdemo_organisation`
--
ALTER TABLE `pbcdemo_organisation`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `pbcdemo_wochenplan`
--
ALTER TABLE `pbcdemo_wochenplan`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `pbc__access_groups`
--
ALTER TABLE `pbc__access_groups`
  MODIFY `GID` smallint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Gruppen ID', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `pbc__backnavi`
--
ALTER TABLE `pbc__backnavi`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT für Tabelle `pbc__groupuser`
--
ALTER TABLE `pbc__groupuser`
  MODIFY `UID` smallint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `pbc__navigation_translation`
--
ALTER TABLE `pbc__navigation_translation`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT für Tabelle `pbc__user`
--
ALTER TABLE `pbc__user`
  MODIFY `UID` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `pbtask__tasks_list1`
--
ALTER TABLE `pbtask__tasks_list1`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `pbtask__tasks_meta`
--
ALTER TABLE `pbtask__tasks_meta`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;


