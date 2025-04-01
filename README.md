Comentaris per la correcció del Roc:

He afegit un nou module, el de tournaments amb els 4 fitxers (routes, controller, services i models). Adiciónalment he afegit al server.ts els imports i la nova api. El problema és que em donava error al fer npx tsc, em generava els arxius .js del tournament però en blanc, només posava "use strict";. Per tant no he pogut comprovar les rutes. Si es solventa aquesta error penso que la resta de coses haguessin anat bé.

Com a l'exercici, he afegit els ratings, dins el gym_service, son les funcions addRating, addLikeOrDislike, getGymRatings i les tres noves rutes: addGymRatingHandler, addGymLikeOrDislikeHandler i getGymRatingsHandler. Al gym_models.ts he afegit els ratings, i per últim al gym controller he desenvolupat les funcions de rating.

Si calgués qualsevol altre aclariment, puc respondre'l sense problema.

Les eines utilitzades, han estat Chat GPT, per sintetitzar l'enunciat, i Copilot per ajudar a corregir errors que no sabia veure.
