import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DamagedDetailsService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    getAllDamageDetailsBySearchText(page: any, pageSize: any, searchText: string) {
        return this.http.get<any>(this.baseUrl + 'damage-detail/user/visco/all-damage-details?page=' + page + '&searchText=' + searchText + '&size=' + pageSize, {
            headers: {Progress_Type: 'BAR'}
        });
    }

    updateDamagedDetails(damageId: string, fine: number, note: string) {
        return this.http.put<any>(this.baseUrl + 'damage-detail/main/visco/damage-details' + damageId,
            {
                fine: fine,
                note: note
            }
        );
    }

    deleteDamageDetail(damageId: string) {
        return this.http.delete<any>(this.baseUrl + 'damage-detail/main/visco/delete-damage-details/' + damageId, {
            headers: {Progress_Type: 'BAR'}
        });
    }

    newDamageDetail(rentId: string, fine: number, note: string) {
        return this.http.post<any>(this.baseUrl + 'damage-detail?rentID='+ rentId, {
                fine: fine,
                note: note
            }
        );
    }
}
