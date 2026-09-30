-- Translate image descriptions and home gallery labels for Greek screen readers.
INSERT INTO translations (entity, entity_id, field, language, value)
SELECT 'project_images', image.id, 'alt', 'el',
    COALESCE(title.value, image.alt) || ' ' ||
    (SELECT COUNT(*) FROM project_images previous WHERE previous.project_id = image.project_id AND previous.id <= image.id)
FROM project_images image
LEFT JOIN translations title ON title.entity = 'projects' AND title.entity_id = image.project_id
    AND title.field = 'title' AND title.language = 'el'
WHERE image.alt <> '';

INSERT INTO translations (entity, entity_id, field, language, value)
SELECT 'page_items', id, 'image_title', 'el', CASE image_title
    WHEN 'Soil Restaurant' THEN 'Εστιατόριο Soil'
    WHEN 'Housing Project' THEN 'Οικιστικό έργο'
    WHEN 'Four Summer Houses' THEN 'Τέσσερις εξοχικές κατοικίες'
    WHEN 'Kitchen Tiles Detail' THEN 'Λεπτομέρεια πλακιδίων κουζίνας'
    WHEN 'Work in Progress' THEN 'Έργο σε εξέλιξη'
    ELSE image_title END
FROM page_items WHERE image_title IS NOT NULL;

INSERT INTO translations (entity, entity_id, field, language, value)
SELECT 'page_items', id, 'alt', 'el', CASE
    WHEN alt LIKE 'Soil Restaurant%' THEN 'Εστιατόριο Soil'
    WHEN alt LIKE 'Housing Project%' THEN 'Οικιστικό έργο'
    WHEN alt = 'Paros' THEN 'Πάρος'
    WHEN alt = 'Kitchen tiles detail' THEN 'Λεπτομέρεια πλακιδίων κουζίνας'
    WHEN alt = 'Work in progress' THEN 'Έργο σε εξέλιξη'
    WHEN alt = 'Services' THEN 'Υπηρεσίες'
    WHEN alt LIKE 'Space is the breath of art.%' THEN 'Ο χώρος είναι η ανάσα της τέχνης. Frank Lloyd Wright'
    ELSE alt END
FROM page_items WHERE alt <> '';