import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { IPosts } from './posts';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpClient;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
providers: [ApiService]
    });
    
  });

  beforeEach(() => {
    service = TestBed.inject(ApiService);
    httpCtrl = TestBed.inject(HttpTestingController);
  })
  afterEach(() => {
    httpCtrl.verify();
  })

  it('should test http test', () => {
    const testData: IPosts[] = [{
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    }];
    service.getPosts().subscribe((res) => {
      expect(testData).toBe(res);
    });

    const req = httpCtrl.expectOne(service.Base_Url);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testData);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
