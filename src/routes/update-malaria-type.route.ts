import { Connection } from 'typeorm';
import { HttpMethod } from '../classes/route';
import { Route } from '../classes/route';
import { MalariaTypeModel } from '../models/malaria-type.model';
import { SeverityModel } from '../models/severity.model';
import { TreatmentModel } from '../models/treatment.model';
import { SymptomModel } from '../models/symptom.model';

export class UpdateMalariaTypeRoute extends Route {
    public getMethod() {
      return HttpMethod.POST;
    }
  
    public endpointName() {
      return '/update-malaria-type';
    }
  
    public async routeFunction(params, db: Connection) {
      if (!params.name || !params.description || !params.severity || !params.treatments || !params.symptoms || params.name.trim().length == 0 || params.description.trim().length == 0)
        throw 'Missing name, description, severity, treatments or symptom parameters';
        
      const _id = (params.id != undefined && params.id !== null) ? params.id : null;
      const _name = params.name;
      const _description = params.description;
      const _severity = params.severity;
      const _treatments = params.treatments;
      const _symptoms = params.symptoms;  

      // Check if the severity exists      
      const severities = db.getRepository(SeverityModel);
      const _severityCheck: SeverityModel = await severities.findOne({
        level: _severity
      });
  
      if (!_severityCheck) {
        throw 'That severity level does not exist';
      } 

      // Check if the treatments exists
      const treatments = db.getRepository(TreatmentModel);
      for (let i = 0; i < _treatments.length; ++i){  
        let _treatmentCheck: TreatmentModel = await treatments.findOne({
          id: _treatments[i]
        });
    
        if (!_treatmentCheck) {
          throw `A treatment with id ${_treatments[i]} does not exist`;
        } 
      }
      
      // Check if the symptoms exists
      const symptoms = db.getRepository(SymptomModel);
      for (let i = 0; i < _symptoms.length; ++i){  
        let _symptomCheck: SymptomModel = await symptoms.findOne({
          id: _symptoms[i]
        });
    
        if (!_symptomCheck) {
          throw `A symptom with id ${_treatments[i]} does not exist`;
        } 
      }

      const malariaTypes = db.getRepository(MalariaTypeModel);      
      // Adding Malaria Type
      if (_id === null)
      {   
        // Check that it doesn't already exist
        const malariaType: MalariaTypeModel = await malariaTypes.findOne({
          name: _name
        });
    
        if (malariaType) {
          throw 'A malaria type with that name already exists';
        }

        const new_malariaType: MalariaTypeModel = new MalariaTypeModel();
        new_malariaType.name = _name;
        new_malariaType.description = _description;
        new_malariaType.severity = _severity;    
        new_malariaType.treatments = _treatments;    
        new_malariaType.symptoms = _symptoms;    
        
        await malariaTypes.save(new_malariaType);
    
        return {
          ...params,
          message: 'Added malaria type'
        };
      }
      // Updating Malaria Type
      else
      {
        const malariaType: MalariaTypeModel = await malariaTypes.findOne({
          id: _id
        });
    
        if (!malariaType) {
          throw 'A malaria type with that id does not exist';
        }

        malariaType.name = _name;
        malariaType.description = _description;
        malariaType.severity = _severity;    
        malariaType.treatments = _treatments;    
        malariaType.symptoms = _symptoms;    
        
        await malariaTypes.save(malariaType);
    
        return {
          ...params,
          message: 'Updated malaria type'
        };
      }
    }
  }