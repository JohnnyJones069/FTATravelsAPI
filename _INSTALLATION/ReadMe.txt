

VIGTIGT: HUSK at notere i rapporten, HVIS du ÆNDRER i backend/API - hvad du ændrer og hvorfor. 
- Og HUSK så også at aflevere din version af backenden.

----------------------------------------------------------------------------------------------------------------
------ START BACKEND/API: --------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

"Produktion" (hvis du ikke retter i backend/API):                                 npm run start

"Developer" (foretrukken hvis du skal rettes i backend - trækker på nodemon):     npm run devStart

Projektet kører på PORT 5099 - dvs. http://localhost:5099
... følg linket - her finder oversigt over alle endpoints og sti til billeder

Projektet benytter MongoDB - tjek .env-filen for at tilrette evt. path/sti til din MongoDB


----------------------------------------------------------------------------------------------------------------
------ API - REST-client (POSTMAN eller INSOMNIA) --------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

BRUG en REST-client som fx POSTMAN eller Insomnia: til at teste API'et - både GET, POST, PUT, PATCH og DELETE
- brug især Postman/Insomnia når du når til POST, PUT, DELETE - da det er her, du aflæser hvordan API'et forventer at modtage data

Oversigt over alle REST/Request-metoder:
Filer til import i Postman/Insomnia kan hentes i mappen: _INSTALLATION/Postman til import

----------------------------------------------------------------------------------------------------------------
------ BILLEDER --------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------


REQUEST: 

Tjek linket http://localhost:5099 

Billederne hentes fra frontend fx med følgende adresse (hvis du ikke har ændret på PORT'en):

    About:
    http://localhost:5099/images/about/xxxxxxx.jpg

    Tours:
    http://localhost:5099/images/tours/xxxxxxx.jpg


UPLOAD: Uploadede (post og put) image-filer placeres i mapperne (afhæng af route):

    /public/images/about
    /public/images/tours

----------------------------------------------------------------------------------------------------------------
------ BRUGERE der kan logge ind -------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

Der er en admin og alm. bruger oprettet på forhånd. Som udgangspunkt har de begge adgang til alle ADMIN-funktioner i API'et.

ADMIN:
Email:      gh@ftatravel.dk
Password:   admin123
Name:       Grace Hopper
Admin:      true

BRUGER:
Email:      tbl@ftatravel.dk
Password:   user123
Name:       Tim Berners Lee
Admin:      false

Du kan oprette yderligere brugere med POST-metoden i endpoint "user" fx via Postman/Insomnia.
Du kan også rette eksisterende brugere med PUT-metoden.
Bemærk, at man ikke kan oprette brugere med samme email-adresse.