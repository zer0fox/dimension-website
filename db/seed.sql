-- Initial collection content, loaded after all migrations on a fresh database.
-- Rows are ordered by sort_order, then by insertion order (id).

INSERT INTO categories (id, slug, name) VALUES
    (1, 'residential', 'Residential'),
    (2, 'offices',     'Offices'),
    (3, 'commercial',  'Commercial'),
    (4, 'graphic',     'Graphic');

INSERT INTO projects (id, category_id, slug, title, year, location, credit, description, has_page, listed) VALUES
    (1, 1, 'paros', 'Four Summer Houses', 2020, 'Dryos, Paros',
        'in collaboration with Marouso Marinopoulou, Architect NTUA',
        'This project is located on Paros Island and consists of four independent luxury suites, mainly intended for tourists during the summer season. Our main concept was to design a fragmented volume that embraces the landscape and adapts to the natural morphology of the site. The characteristic ' || char(8220) || 'white' || char(8221) || ' of Cycladic architecture harmonizes beautifully with the stone, while the deliberate use of earthy tones further enhances the integration with the surroundings.',
        1, 1),
    (2, 1, 'grey-house', 'The Grey Project', 2019, 'Palaio Faliro', NULL, NULL, 1, 0),
    (3, 1, 'small-but-classy-apartment', 'Small but Classy', 2018, 'Kypseli', NULL, NULL, 1, 1),
    (4, 1, 'playful-apartment', 'Playful Apartment', 2018, 'Cholargos', NULL, NULL, 1, 1),
    (5, 1, 'its-a-girls-game', 'It''s a Girls Game', 2017, 'Pangrati', NULL, NULL, 1, 1),
    (6, 1, 'home-sweet-home', 'Home Sweet Home', 2016, 'Polygono', NULL, NULL, 1, 0),
    (7, 1, 'endless-lines', 'Endless Lines', 2009, 'Lycabettus',
        'in collaboration with Marina Arampatzi, Architect NTUA', NULL, 1, 1),
    (8, 1, 'elianthos', 'Elianthos Gi', 2007, 'Gythio', NULL, NULL, 1, 1),

    (9,  2, 'blown-by-the-wind', 'Blown by the Wind', 2018, 'Nea Smyrni', NULL, NULL, 1, 1),
    (10, 2, 'connect-to-technology', 'Connect to Technology', 2015, 'Nea Ionia', NULL, NULL, 1, 1),

    (11, 3, 'soil', 'Soil Restaurant', 2021, 'Pangrati', NULL,
        'The old neoclassical building was constructed in 1925 as a residence and nowadays it operates as a fine-dining restaurant. The goal of the renovation was to preserve the memory as well as to respect the history of the building. All of the chosen materials that define the aesthetics of the space were chosen respectfully and they were inspired by the earth, the stone and the soil. Our main intention was the absolute integration to the old and full of memories ' || char(8220) || 'shelter' || char(8221) || ' or the house. As a result, radical interventions were avoided. The existing beautiful courtyard garden in the open space maintains the era of an urban Athenian garden, shaded by century-old orange trees.',
        1, 1),
    (12, 3, 'kampi', 'Beach Bar', 2015, 'Fournoi Ikarias', NULL, NULL, 1, 1),

    (13, 4, 'bcn', NULL, NULL, NULL, NULL, NULL, 0, 1),
    (14, 4, 'commisaria-vilafranca', NULL, NULL, NULL, NULL, NULL, 0, 1),
    (15, 4, 'panel-tanatori', NULL, NULL, NULL, NULL, NULL, 0, 1);

INSERT INTO project_images (project_id, src, alt, visible) VALUES
    (1, '/img/projects/residential/paros2020/paros-1.jpg', 'Paros Four summer houses', 1),
    (1, '/img/projects/residential/paros2020/paros-a.jpg', 'Paros A', 1),
    (1, '/img/projects/residential/paros2020/paros-a1.jpg', 'Paros A1', 1),
    (1, '/img/projects/residential/paros2020/paros-b.jpg', 'Paros B', 1),
    (1, '/img/projects/residential/paros2020/paros-ccc.jpg', 'Paros C', 1),
    (1, '/img/projects/residential/paros2020/paros-d.jpg', 'Paros D', 1),
    (1, '/img/projects/residential/paros2020/paros-e1.jpg', 'Paros E1', 1),
    (1, '/img/projects/residential/paros2020/paros-e2.jpg', 'Paros E2', 1),
    (1, '/img/projects/residential/paros2020/paros-f.jpg', 'Paros F', 1),
    (1, '/img/projects/residential/paros2020/paros-2.jpg', 'Paros 2', 0),
    (1, '/img/projects/residential/paros2020/paros-3.jpg', 'Paros 3', 1),
    (1, '/img/projects/residential/paros2020/paros-4.jpg', 'Paros 4', 1),
    (1, '/img/projects/residential/paros2020/paros-5.jpg', 'Paros 5', 1),
    (1, '/img/projects/residential/paros2020/paros-6.jpg', 'Paros 6', 1),
    (1, '/img/projects/residential/paros2020/paros-7-under-construction.jpg', 'Under Construction', 0),

    (2, '/img/projects/residential/greyhouse2019/bathroom-wood-tile-1.jpg', 'The Grey Project', 1),
    (2, '/img/projects/residential/greyhouse2019/bathroom-wood-tile-2.jpg', 'The Grey Project', 1),

    (3, '/img/projects/residential/smallbutclassyapartment2018/kypseli-1.jpg', 'Small But Classy Apartment', 0),
    (3, '/img/projects/residential/smallbutclassyapartment2018/kypseli-2.jpg', 'Small But Classy Apartment 2', 0),
    (3, '/img/projects/residential/smallbutclassyapartment2018/kypseli-3.jpg', 'Small But Classy Apartment 3', 0),
    (3, '/img/projects/residential/smallbutclassyapartment2018/kypseli-4.jpg', 'Small But Classy Apartment 4', 0),
    (3, '/img/projects/residential/smallbutclassyapartment2018/sbc-main.jpg', 'Small But Classy main', 1),
    (3, '/img/projects/residential/smallbutclassyapartment2018/sbc01.jpg', 'Small But Classy 1', 1),
    (3, '/img/projects/residential/smallbutclassyapartment2018/sbc02.jpg', 'Small But Classy 2', 1),
    (3, '/img/projects/residential/smallbutclassyapartment2018/kypseli-5.jpg', 'Small But Classy Apartment 5', 1),
    (3, '/img/projects/residential/smallbutclassyapartment2018/kypseli-6.jpg', 'Small But Classy Apartment 6', 0),
    (3, '/img/projects/residential/smallbutclassyapartment2018/kypseli-7.jpg', 'Small But Classy Apartment 7', 0),
    (3, '/img/projects/residential/smallbutclassyapartment2018/room-yellow-1.jpg', 'Room Yellow', 0),
    (3, '/img/projects/residential/smallbutclassyapartment2018/room-yellow-2.jpg', 'Room Yellow 2', 0),
    (3, '/img/projects/residential/smallbutclassyapartment2018/kypseli-plan.jpg', 'Small But Classy Apartment plan', 1),

    (4, '/img/projects/residential/playfulapartment2018/02-herringbone-detail.jpg', 'herringbone detail', 1),
    (4, '/img/projects/residential/playfulapartment2018/01-kitchen-herringbone.jpg', 'kitchen herringbone', 1),
    (4, '/img/projects/residential/playfulapartment2018/03-bathroom-bw-tiles.jpg', 'bathroom bw tiles', 1),
    (4, '/img/projects/residential/playfulapartment2018/04-bathroom-detail-grey.jpg', 'bathroom detail grey', 1),
    (4, '/img/projects/residential/playfulapartment2018/05-bathroom-detail-grey.jpg', 'bathroom detail grey 2', 1),
    (4, '/img/projects/residential/playfulapartment2018/06-bathroom-bw-general.jpg', 'bathroom bw general', 1),
    (4, '/img/projects/residential/playfulapartment2018/07-bathroom-blue.jpg', 'bathroom blue', 1),
    (4, '/img/projects/residential/playfulapartment2018/08-sofa-christmas.jpg', 'sofa christmas', 1),

    (5, '/img/projects/residential/itsagirlsgame2017/01-kitchen.jpg', 'kitchen', 1),
    (5, '/img/projects/residential/itsagirlsgame2017/02-entrance-tree.jpg', 'entrance tree', 1),
    (5, '/img/projects/residential/itsagirlsgame2017/03-bathroom-tree.jpg', 'bathroom tree', 1),
    (5, '/img/projects/residential/itsagirlsgame2017/04-detail-furniture.jpg', 'detail furniture', 1),
    (5, '/img/projects/residential/itsagirlsgame2017/05-detail-bathroom.jpg', 'detail bathroom', 1),
    (5, '/img/projects/residential/itsagirlsgame2017/06-detail-pink.jpg', 'detail pink', 1),

    (6, '/img/projects/residential/prigkiponnison2016/01-floor-appartment.jpg', 'floor appartment', 1),
    (6, '/img/projects/residential/prigkiponnison2016/02-kitchen-interior.jpg', 'kitchen interior', 1),
    (6, '/img/projects/residential/prigkiponnison2016/03-italian-tile-bathroom.jpg', 'italian tile bathroom', 1),

    (7, '/img/projects/residential/karaklioumi2009/02-wood-construction.jpg', 'wood construction', 1),
    (7, '/img/projects/residential/karaklioumi2009/03-wood-detail.jpg', 'wood detail', 1),
    (7, '/img/projects/residential/karaklioumi2009/01-wood-entrance.jpg', 'wood entrance', 1),

    (8, '/img/projects/residential/elianthos2007/01-general-dp.jpg', 'general dp', 1),
    (8, '/img/projects/residential/elianthos2007/02-stone-house-traditional.jpg', 'stone house traditional', 1),
    (8, '/img/projects/residential/elianthos2007/03-stone-house-sketch.jpg', 'stone house sketch', 1),

    (9, '/img/projects/offices/blownbythewind2018/blown-by-the-wind-1.jpg', 'Blown by the Wind', 1),
    (9, '/img/projects/offices/blownbythewind2018/blown-by-the-wind-2.jpg', 'Blown by the Wind 2', 1),
    (9, '/img/projects/offices/blownbythewind2018/blown-by-the-wind-3.jpg', 'Blown by the Wind 3', 1),
    (9, '/img/projects/offices/blownbythewind2018/blown-by-the-wind-4.jpg', 'Blown by the Wind 4', 1),
    (9, '/img/projects/offices/blownbythewind2018/blown-by-the-wind-5.jpg', 'Blown by the Wind 5', 1),

    (10, '/img/projects/offices/connecttotechnology2015/connect-to-technology-1.jpg', 'Connect to Technology', 1),
    (10, '/img/projects/offices/connecttotechnology2015/connect-to-technology-2.jpg', 'Connect to Technology 2', 0),
    (10, '/img/projects/offices/connecttotechnology2015/connect-to-technology-3.jpg', 'Connect to Technology 3', 1),
    (10, '/img/projects/offices/connecttotechnology2015/connect-to-technology-4.jpg', 'Connect to Technology 4', 1),
    (10, '/img/projects/offices/connecttotechnology2015/connect-to-technology-5.jpg', 'Connect to Technology 5', 1),

    (11, '/img/projects/commercial/soil2021/_AY51611.jpg', 'Soil Restaurant 1', 1),
    (11, '/img/projects/commercial/soil2021/_AY51680.jpg', 'Soil Restaurant 8', 1),
    (11, '/img/projects/commercial/soil2021/soil1.jpg', 'Soil Restaurant new 1', 1),
    (11, '/img/projects/commercial/soil2021/soil2.jpg', 'Soil Restaurant new 2', 1),
    (11, '/img/projects/commercial/soil2021/soil3.jpg', 'Soil Restaurant new 3', 1),
    (11, '/img/projects/commercial/soil2021/_AY51608.jpg', 'Soil Restaurant 6', 1),
    (11, '/img/projects/commercial/soil2021/_AY51383.jpg', 'Soil Restaurant 7', 1),

    (12, '/img/projects/commercial/kampi2015/kampi-1.jpg', 'Beach Bar', 1),
    (12, '/img/projects/commercial/kampi2015/kampi-3.jpg', 'Beach Bar 3', 1),
    (12, '/img/projects/commercial/kampi2015/kampi-4.jpg', 'Beach Bar 4', 1),
    (12, '/img/projects/commercial/kampi2015/kampi-5.jpg', 'Beach Bar 5', 1),
    (12, '/img/projects/commercial/kampi2015/kampi-2.jpg', 'Beach Bar 2', 1),
    (12, '/img/projects/commercial/kampi2015/kampi-6.jpg', 'Beach Bar 6', 0),

    (13, '/img/projects/graphic/bcn.jpg', 'bcn', 1),
    (14, '/img/projects/graphic/commisaria-vilafranca-concept-design.jpg', 'Commisaria vilafranca concept design', 1),
    (15, '/img/projects/graphic/panel-tanatori.png', 'Panel tanatori', 1);


INSERT INTO page_items (page_id, image, alt, image_title, link, visible) VALUES
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/projects/commercial/soil2021/_AY51320.jpg', 'Soil Restaurant 1', 'Soil Restaurant', '/projects/commercial/soil', 0),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/projects/commercial/soil2021/_AY51318.jpg', 'Soil Restaurant 2', 'Soil Restaurant', '/projects/commercial/soil', 0),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/projects/commercial/soil2021/soil1.jpg', 'Soil Restaurant', 'Soil Restaurant', '/projects/commercial/soil', 1),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/projects/residential/housingproject2024/house1.jpg', 'Housing Project 1', 'Housing Project', NULL, 1),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/home/1.jpg', 'Space is the breath of art. --Frank Lloyd Wright', NULL, NULL, 1),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/projects/residential/housingproject2024/house2.jpg', 'Housing Project 2', 'Housing Project', NULL, 1),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/projects/residential/paros2020/paros-a1.jpg', 'Paros', 'Four Summer Houses', '/projects/residential/paros', 1),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/home/4.jpg', 'Kitchen tiles detail', 'Kitchen Tiles Detail', NULL, 1),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/home/5.jpg', '', NULL, NULL, 0),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/home/6.jpg', 'Work in progress', 'Work in Progress', NULL, 1),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/home/8.jpg', 'Work in progress', 'Work in Progress', NULL, 1),
    ((SELECT id FROM pages WHERE slug = 'home'), '/img/other/services.png', 'Services', NULL, NULL, 1);