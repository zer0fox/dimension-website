-- English remains in the existing columns. Greek overrides are keyed by row and field.
CREATE TABLE translations (
    entity TEXT NOT NULL,
    entity_id INTEGER NOT NULL,
    field TEXT NOT NULL,
    language TEXT NOT NULL CHECK (language IN ('el', 'en')),
    value TEXT NOT NULL,
    PRIMARY KEY (entity, entity_id, field, language)
);

INSERT INTO translations (entity, entity_id, field, language, value) VALUES
('site',1,'description','el','Το Dimension Studio είναι ένα αρχιτεκτονικό γραφείο στην Αθήνα, που ιδρύθηκε το 2008 από την αρχιτέκτονα Δήμητρα Γώγη. Σχεδιάζει κατοικίες, επαγγελματικούς και εμπορικούς χώρους.'),
('site',1,'owner_name','el','Δήμητρα Γώγη'),
('site',1,'owner_title','el','Αρχιτέκτονας'),
('site',1,'city','el','Αθήνα'),
('categories',1,'name','el','Κατοικίες'),
('categories',2,'name','el','Γραφεία'),
('categories',3,'name','el','Εστίαση & Εμπόριο'),
('categories',4,'name','el','Γραφιστική'),
('pages',1,'title','el','Αρχική'),
('pages',2,'title','el','Σχετικά'),
('pages',3,'title','el','Επικοινωνία'),
('pages',4,'title','el','Η σελίδα δεν βρέθηκε'),
('pages',1,'heading','el','ΔΗΜΙΟΥΡΓΙΚΟ ΓΡΑΦΕΙΟ'),
('pages',1,'subheading','el','στην Αθήνα'),
('pages',1,'meta_title','el','Dimension Studio | Αρχιτεκτονική & Εσωτερική Διακόσμηση στην Αθήνα'),
('pages',2,'heading','el','Δήμητρα Γώγη'),
('pages',2,'image_alt','el','Πορτρέτο της Δήμητρας Γώγη'),
('pages',2,'meta_title','el','Σχετικά με τη Δήμητρα Γώγη | Dimension Studio'),
('pages',3,'meta_title','el','Επικοινωνία | Dimension Studio'),
('pages',4,'meta_title','el','Η σελίδα δεν βρέθηκε | Dimension Studio'),
('projects',1,'title','el','Τέσσερις εξοχικές κατοικίες'),
('projects',1,'location','el','Δρυός, Πάρος'),
('projects',1,'credit','el','σε συνεργασία με τη Μαρούσω Μαρινοπούλου, Αρχιτέκτονα ΕΜΠ'),
('projects',1,'description','el','Το έργο βρίσκεται στην Πάρο και αποτελείται από τέσσερις ανεξάρτητες πολυτελείς σουίτες για θερινή διαμονή. Κεντρική ιδέα ήταν ο σχεδιασμός ενός κατακερματισμένου όγκου που αγκαλιάζει το τοπίο και προσαρμόζεται στη φυσική μορφολογία του. Το χαρακτηριστικό λευκό της κυκλαδίτικης αρχιτεκτονικής συνδυάζεται με την πέτρα και τις γήινες αποχρώσεις.'),
('projects',2,'title','el','Το γκρι σπίτι'),
('projects',2,'location','el','Παλαιό Φάληρο'),
('projects',3,'title','el','Μικρό αλλά κομψό'),
('projects',3,'location','el','Κυψέλη'),
('projects',4,'title','el','Παιχνιδιάρικο διαμέρισμα'),
('projects',4,'location','el','Χολαργός'),
('projects',5,'title','el','Κοριτσίστικο παιχνίδι'),
('projects',5,'location','el','Παγκράτι'),
('projects',6,'title','el','Σπίτι μου σπιτάκι μου'),
('projects',6,'location','el','Πολύγωνο'),
('projects',7,'title','el','Ατελείωτες γραμμές'),
('projects',7,'location','el','Λυκαβηττός'),
('projects',7,'credit','el','σε συνεργασία με τη Μαρίνα Αραμπατζή, Αρχιτέκτονα ΕΜΠ'),
('projects',8,'location','el','Γύθειο'),
('projects',9,'title','el','Στον άνεμο'),
('projects',9,'location','el','Νέα Σμύρνη'),
('projects',10,'title','el','Σύνδεση με την τεχνολογία'),
('projects',10,'location','el','Νέα Ιωνία'),
('projects',11,'title','el','Εστιατόριο Soil'),
('projects',11,'location','el','Παγκράτι'),
('projects',11,'description','el','Το παλιό νεοκλασικό κτίριο χτίστηκε το 1925 ως κατοικία και σήμερα λειτουργεί ως εστιατόριο υψηλής γαστρονομίας. Η ανακαίνιση είχε στόχο να διατηρήσει τη μνήμη και να σεβαστεί την ιστορία του κτιρίου. Τα υλικά αντλούν έμπνευση από τη γη, την πέτρα και το χώμα. Αποφύγαμε τις ριζικές επεμβάσεις, διατηρώντας τον χαρακτήρα του κτιρίου και τον όμορφο κήπο της εσωτερικής αυλής, στη σκιά αιωνόβιων πορτοκαλιών.'),
('projects',12,'title','el','Παραλιακό μπαρ'),
('projects',12,'location','el','Φούρνοι Ικαρίας');

INSERT INTO translations (entity, entity_id, field, language, value)
SELECT 'page_paragraphs', id, 'lead', 'el', 'Dimension Studio' FROM page_paragraphs WHERE page_id = (SELECT id FROM pages WHERE slug = 'about') AND lead IS NOT NULL;
INSERT INTO translations (entity, entity_id, field, language, value)
SELECT 'page_paragraphs', id, 'body', 'el', CASE row_number
    WHEN 1 THEN 'ιδρύθηκε το 2008 και βρίσκεται στην Αθήνα.'
    WHEN 2 THEN 'Σπούδασα Αρχιτεκτονική στο Εθνικό Μετσόβιο Πολυτεχνείο (1999 - 2006) και Σχεδιασμό Εσωτερικών Χώρων για Εμπορικούς Χώρους στο IED της Βαρκελώνης (2006 - 2007).'
    WHEN 3 THEN 'Τα τελευταία χρόνια έχω ασχοληθεί με διάφορα αρχιτεκτονικά έργα, από τη σύλληψη της ιδέας έως την επίβλεψη και την κατασκευή.'
    WHEN 4 THEN 'Η δημιουργικότητα και η καινοτομία είναι οι βασικές μου προτεραιότητες.'
END FROM (SELECT id, row_number() OVER (ORDER BY sort_order, id) AS row_number FROM page_paragraphs WHERE page_id = (SELECT id FROM pages WHERE slug = 'about')) WHERE row_number <= 4;
INSERT INTO translations (entity, entity_id, field, language, value)
SELECT 'page_paragraphs', id, 'body', 'el', 'Η σελίδα δεν βρέθηκε.' FROM page_paragraphs WHERE page_id = (SELECT id FROM pages WHERE slug = 'not-found');