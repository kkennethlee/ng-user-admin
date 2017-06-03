export var tpl = "\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <br />\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <table class=\"table table-bordered table-hover\"> \n            <thead>\n                <tr>\n                    <th (click)=\"sort('id')\">\n                        ID\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                    <th (click)=\"sort('user_id')\">\n                        User ID\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                    <th>\n                        Event Log\n                    </th>\n                    <th>\n                        Event Data\n                    </th>\n                    <th (click)=\"sort('created_at')\">\n                        Created At\n                        <i class=\"fa\" [ngClass]=\"{'fa-sort-asc': (sortDir == 'asc'), 'fa-sort-desc': (sortDir == 'desc')}\" aria-hidden=\"true\"></i>\n                    </th>\n                </tr>\n            </thead>\n\n            <tbody *ngIf=\"wait\"> \n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <i class=\"fa fa-refresh fa-spin fa-2x fa-fw\"></i> \n                    </td>\n                </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!wait && events.length <= 0\">\n                <tr>\n                    <td colspan=\"7\" align=\"center\">\n                        <alert type=\"warning\">Sorry, no user events were found.</alert>\n                    </td>\n                </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!wait && events.length > 0\">\n                <tr class=\"users-events\" *ngFor=\"let event of events\">\n                    <td> {{event.id}} </td>\n                    <td> {{event.user_id}} </td>\n                    <td> {{event.event}} </td>\n                    <td> {{event.event_data|json}} </td>\n                    <td> {{event.created_at}} </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n<div class=\"row paging\" *ngIf=\"eventsTotal\">\n    <div class=\"col-xs-4\">\n\n        <nav aria-label=\"Page navigation\">\n          <ul class=\"pagination pagination-sm\">\n\n            <li *ngIf=\"(currentPage > 1)\">\n              <a (click)=\"clickPrev()\" aria-label=\"Previous\">\n                <span aria-hidden=\"true\">&laquo;</span>\n              </a>\n            </li>\n\n            <li \n                *ngFor=\"let page of pages\"\n                 [ngClass]=\"{'active': (page == currentPage)}\"\n                >\n                <a (click)=\"clickPage(page)\">{{ page }}</a>\n            </li>\n\n            <li *ngIf=\"(currentPage < getPageCount())\">\n              <a (click)=\"clickNext()\" aria-label=\"Next\">\n                <span aria-hidden=\"true\">&raquo;</span>\n              </a>\n            </li>\n\n          </ul>\n        </nav>\n\n    </div>\n</div>\n";
//# sourceMappingURL=users-event-log.component.tpl.js.map